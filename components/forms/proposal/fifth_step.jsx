import { useProposalContext } from '../../../contexts/proposal';
import IconAdd from '../../common/icons/add';
import { getUploadUrlProposal, setStatusProposal } from '../../../lib/functions/proposal';
import IconProposalFile from '../../common/icons/proposal_file';
import { Tooltip } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { api } from '@/lib/api';
import { Notify } from '@/components/common/notification';

export default function FifthStepForm() {
  const { proposal, toggleProposalMenu } = useProposalContext();
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (documents.some((doc) => doc.status === 'pending')) {
      setError(true);
    } else {
      setStatusProposal(proposal.id, 'documents_submitted').then(() => window.location.reload());
    }
  };

  useEffect(() => {
    if (!proposal?.id) return;

    api.get(`/jobs/proposal/forms/${proposal.id}`).then(({ status, data = [] }) => {
      if (status !== 200) return;

      const newDocs = proposal?.documents?.map((doc) => ({
        ...doc,
        status: data.some((d) => d.name === doc.name) ? 'uploaded' : 'pending',
      }));
      setDocuments(newDocs);
    });
  }, [proposal?.id, proposal?.documents]);

  return (
    <form onSubmit={onSubmit} id="form-05">
      <RequiredDocuments
        documents={documents}
        setDocuments={setDocuments}
        proposal_id={proposal.id}
        error={error}
        setError={setError}
      />
    </form>
  );
}

const RequiredDocuments = ({ proposal_id, documents, setDocuments, error, setError }) => {
  const invisibles = (2 - (documents.length % 4) + 4) % 4;

  const sanitizeFileName = (fileName) => {
    return fileName
      .normalize('NFD') // Normalize accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^\w\s]/g, '') // Remove non-alphanumeric characters except spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim(); // Trim leading and trailing spaces
  };

  const onDrop = async (acceptedFiles, index) => {
    if (acceptedFiles.length > 0) {
      if (acceptedFiles[0].type.includes('pdf')) {
        let sanitizedFileName = sanitizeFileName(documents[index].name);

        try {
          const uploadUrlRes = await getUploadUrlProposal(
            proposal_id,
            acceptedFiles[0]?.name,
            sanitizedFileName,
          );

          await fetch(uploadUrlRes.URL, {
            method: uploadUrlRes.Method,
            headers: uploadUrlRes.SignedHeader,
          }).then((res) => {
            if (!res.ok) {
              Notify.error(
                'Erro ao fazer o upload do arquivo, tente novamente ou entre em contato com o suporte.',
              );
              throw new Error('Erro ao fazer upload do arquivo');
            }

            setDocuments(
              documents.map((doc, i) => {
                return i === index ? { ...doc, status: 'uploaded', file: acceptedFiles[0] } : doc;
              }),
            );

            Notify.success('Arquivo anexado com sucesso.');
          });
        } catch (error) {
          Notify.error(
            'Erro ao fazer o upload do arquivo, tente novamente ou entre em contato com o suporte.',
          );
          console.error(error);
        }
      } else {
        Notify.error('O arquivo deve ser um PDF.');
      }
    }
  };

  return (
    <div className="h-full">
      <div className="grid h-full grid-cols-1 gap-6 p-6 overflow-auto md:grid-cols-2 lg:grid-cols-4">
        {error && (
          <div className="flex items-center justify-center">
            <div className="p-4 bg-red-100 rounded-md">
              <p className="text-red-500">É necessário enviar todos os documentos</p>
            </div>
          </div>
        )}
        {documents?.map((doc, index) => (
          <Dropzone
            key={index}
            accept={'application/pdf'}
            multiple={false}
            onDrop={(acceptedFiles) => onDrop(acceptedFiles, index)}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex flex-col justify-between items-center w-full max-w-[350px] md:max-w-none lg:max-w-none h-[290px] p-4 border shadow-lg rounded-[20px] mx-auto ${
                  isDragActive && 'bg-[#C2B54126]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-base text-left">{doc.name}</h3>
                  <Tooltip
                    className="text-gray-500 z-[20] max-w-[300px] bg-white rounded-md shadow-md"
                    placement="bottom"
                    content={<div>{doc?.description}</div>}
                  >
                    <div
                      className={`w-4 h-4 ${
                        doc.status === 'pending' ? 'bg-[#C2B541]' : 'bg-green-400'
                      } rounded-full`}
                    />
                  </Tooltip>
                </div>
                {doc.status === 'pending' ? (
                  <IconAdd className="transition-all duration-300 cursor-pointer h-14 w-14 hover:scale-95" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <IconProposalFile />
                    <span className="text-xs text-gray-300">{doc?.file?.name}</span>
                  </div>
                )}
                <input {...getInputProps()} accept="image/*, application/pdf" />
                <p
                  className={`${
                    doc.status === 'pending' ? 'text-[#4D41C2]' : 'text-gray-600'
                  } underline cursor-pointer`}
                >
                  {doc.status === 'pending' ? 'Anexar documento' : 'Alterar documento'}
                </p>
              </div>
            )}
          </Dropzone>
        ))}
        {Array.from({ length: invisibles }).map((_, i) => (
          <div key={i} className="w-full min-h-[290px] lg:block hidden" />
        ))}
        <div className="col-span-1 md:col-span-2 bg-[#4D41C226] h-[290px] my-4 p-4 rounded-[20px]">
          <h3 className="font-grotesque text-[#454168] mb-1 font-extrabold text-lg md:text-2xl">
            OBS: DEVIDO A EXIGÊNCIA DO E-SOCIAL
          </h3>
          <p className="text-justify md:leading-6 font-poppins indent-3">
            O empregado deverá iniciar suas atividades somente um dia após a informação do registro
            forem comunicadas ao E-Social. Desta forma, para cumprir tal exigência, necessitamos dos
            documentos do empregado mencionados acima, com urgência, bem como as informações por
            parte da empresa.
          </p>
        </div>
      </div>
    </div>
  );
};
