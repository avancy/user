export function cpf(value) {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export function rg(value) {
  return value.replace(/\D+/g, '').replace(/(\d{6})(\d)$/, '$1-$2');
}

export function pisPasep(value) {
  return value
    .replace(/\D+/g, '') // Remove tudo que não for dígito
    .slice(0, 11) // Limita o número de caracteres a 11 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto após três dígitos
    .replace(/(\d{5})(\d)/, '$1.$2') // Coloca o segundo ponto após oito dígitos
    .replace(/(\d{2})(\d{1})$/, '$1-$2'); // Coloca o traço após dez dígitos e o último dígito
}

export function ctps(value) {
  return value
    .replace(/\D+/g, '') // Remove tudo que não for dígito
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto após três dígitos
    .replace(/(\d{5})(\d)/, '$1.$2') // Coloca o segundo ponto após oito dígitos
    .replace(/(\d{2})(\d{1})$/, '$1-$2'); // Coloca o traço e limita o último dígito
}

export function bankAccount(value) {
  return value
    .replace(/\D+/g, '') // Remove tudo que não for dígito
    .replace(/(\d{8})(\d)/, '$1-$2') // Coloca o traço após oito dígitos
    .replace(/(-\d)\d+?$/, '$1'); // Limita o número a um dígito no final
}

export function bankAgency(value) {
  return value
    .replace(/\D+/g, '') // Remove tudo que não for dígito
    .replace(/(\d{4})(\d)/, '$1-$2') // Coloca o traço após quatro dígitos
    .replace(/(-\d)\d+?$/, '$1'); // Limita o número a um dígito no final
}

export function money(value) {
  if (!value) return '';

  let cleanValue = '0';
  if (typeof value === 'number') {
    cleanValue = (Math.trunc(value * 100) / 100).toString();
  } else cleanValue = value.replace(/\D+/g, '');
  const options = { style: 'currency', currency: 'BRL' };
  return new Intl.NumberFormat('pt-br', options).format(cleanValue);
}

export function cep(value) {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

export function date(value) {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1');
}

export function validatePhoneNumber(phoneNumber) {
  const regex = /^\+55\s?\(?(\d{2})\)?[\s-]?(\d{1})?\d{4}[-.\s]?(\d{4})$/;
  return regex.test(phoneNumber);
}

export function formatPhoneNumber(phoneNumber) {
  if (!validatePhoneNumber(phoneNumber)) {
    return null;
  }

  // Remove o prefixo "+55"
  const cleaned = phoneNumber.replace(/^\+55/, '');

  let formatted;

  if (cleaned.length === 10) {
    formatted = cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) 9$2-$3');
  } else {
    formatted = cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2$3-$4');
  }

  return formatted;
}

export function phone(value) {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }

  return cleaned;
}

export function dateBR(value) {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1');
}

export function cnpj(value) {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export function electoralTitle(value) {
  const cleaned = value.replace(/\D+/g, '');

  if (cleaned.length < 12) {
    return cleaned;
  }

  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function lowercase(value) {
  return value.toLowerCase();
}

export function uppercase(value) {
  return value.toUpperCase();
}
