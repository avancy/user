import ExcelJS from 'exceljs';

async function getWorkbookFromUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao carregar o arquivo Excel');
    }

    const buffer = await response.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    return workbook;
  } catch (error) {
    console.error('Erro ao carregar a planilha:', error);
    throw error;
  }
}

async function findTagInterval(worksheet) {
  try {
    let firstTag = null;
    let lastTag = null;

    worksheet.eachRow((row, rowIndex) => {
      row.eachCell((cell, colIndex) => {
        if (typeof cell.value === 'string') {
          if (cell.value.includes('{{') && cell.value.includes('}}')) {
            if (firstTag === null) {
              firstTag = { row: rowIndex, column: colIndex };
            }
            lastTag = { row: rowIndex, column: colIndex };
          }
        }
      });
    });

    return { firstTag, lastTag };
  } catch (e) {
    console.error(e);
    return;
  }
}

async function copyRangeNTimes(worksheet, interval, numberOfCopies) {
  const startRow = interval.firstTag.row;
  const endRow = interval.lastTag.row;
  const intervalHeight = interval.lastTag.row - interval.firstTag.row + 1;

  const mergeds = worksheet.model.merges.filter((merge) => {
    const [startAddress, endAddress] = merge.split(':');
    const startCellRow = worksheet.getCell(startAddress).row;
    const endCellRow = worksheet.getCell(endAddress).row;

    return startCellRow >= startRow && endCellRow <= endRow;
  });

  for (let copyIndex = 0; copyIndex < numberOfCopies; copyIndex++) {
    const destinationRow = endRow + 1 + copyIndex * intervalHeight;

    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
      const sourceRow = worksheet.getRow(rowIndex);
      const newRow = worksheet.getRow(destinationRow + (rowIndex - startRow));

      const adjustedValues = [];
      for (let i = 1; i < sourceRow.values.length; i++) {
        adjustedValues[i - 1] = sourceRow.values[i];
      }

      newRow.values = adjustedValues;
      newRow.height = sourceRow.height;
      newRow.hidden = sourceRow.hidden;
      newRow.style = { ...sourceRow.style };
    }

    mergeds.forEach((merge) => {
      const [startAddress, endAddress] = merge.split(':');
      const startCellRow = worksheet.getCell(startAddress).row;
      const startCellCol = worksheet.getCell(startAddress).col;
      const endCellRow = worksheet.getCell(endAddress).row;
      const endCellCol = worksheet.getCell(endAddress).col;

      const newStartRow = destinationRow + (startCellRow - startRow);
      const newEndRow = destinationRow + (endCellRow - startRow);

      const newMerge = `${worksheet.getRow(newStartRow).getCell(startCellCol).address}:${
        worksheet.getRow(newEndRow).getCell(endCellCol).address
      }`;

      worksheet.mergeCells(newMerge);
    });
  }
}

async function replaceTags(worksheet, replaces) {
  const isArray = Array.isArray(replaces);
  const copReplaces = isArray ? [...replaces] : [{ ...replaces }];

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      if (typeof cell.value === 'string' && cell.value.includes('{{')) {
        const matches = cell.value.match(/{{\s*[\w.]+\s*}}/g);

        if (matches) {
          matches.forEach((match) => {
            const placeholder = match.replace('{{', '').replace('}}', '');

            for (let c = 0; c < copReplaces.length; c++) {
              const replaceValue = copReplaces[c][placeholder];
              if (replaceValue !== null) {
                cell.value = cell.value.replace(match, replaceValue);
                copReplaces[c][placeholder] = null;
                break;
              }
            }
          });
        }
      }
    });
  });
}

async function createTableByTemplate(data, template_url) {
  try {
    const workbook = await getWorkbookFromUrl(template_url);
    const worksheet = workbook.worksheets[0];
    if (Array.isArray(data)) {
      const interval = await findTagInterval(worksheet);
      const numberOfCopies = Math.max(0, data.length - 1);
      await copyRangeNTimes(worksheet, interval, numberOfCopies);
    }
    await replaceTags(worksheet, data);
    return await workbook.xlsx.writeBuffer();
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
    return null;
  }
}

export async function uploadFile({ data, template_url, upload_url, method = 'PUT', headers }) {
  const excelBuffer = await createTableByTemplate(data, template_url);
  if (!excelBuffer) {
    return { error: true };
  }

  const file = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  try {
    const res = await fetch(upload_url, {
      method: method ? method : 'PUT',
      headers: headers === null || headers === undefined ? {} : headers,
      body: file,
    });

    if (!res.ok) {
      throw new Error('status de upload não esperado: ' + res.status);
    }

    return { error: false };
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    return { error: true };
  }
}
