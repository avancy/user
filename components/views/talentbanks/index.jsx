import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

function TalentBankItem({ talent_bank, onClick, isOpen }) {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-4xl">
      <div
        onClick={onClick}
        className="flex items-center justify-between p-4 transition-colors cursor-pointer hover:bg-gray-50"
      >
        <span className="pl-2 text-lg font-medium text-brand-primary-300">
          {talent_bank.company.name}
        </span>
        <ChevronDownIcon
          className={clsx(
            'w-6 h-6 text-brand-primary-300 transition-all duration-300',
            !isOpen ? 'rotate-0' : '-rotate-90',
          )}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {talent_bank.departaments.length > 0 ? (
              <DepartmentList departments={talent_bank.departaments} />
            ) : (
              <p className="pt-2 text-sm italic text-gray-500">Nenhum departamento disponível.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DepartmentList({ departments }) {
  return (
    <div className="px-6 pb-4">
      <h4 className="mb-2 text-base font-semibold font-display text-brand-primary-300">
        Departamentos
      </h4>
      <ul className="flex flex-col pl-5 list-disc gap-y-2">
        {departments.map((department) => (
          <li key={department.id} className="font-sans text-sm text-gray-700">
            {department.Name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TalentBanksView({ talent_banks = [] }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId((prev) => (prev === companyId ? null : companyId));
  };

  return (
    <div className="flex flex-col flex-1 max-w-4xl max-h-full p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-semibold font-display text-brand-primary-300">
        Bancos de Talentos
      </h2>
      <p className="mb-8 text-base leading-relaxed text-gray-700">
        Confira os Bancos de Talentos aos quais você se inscreveu. Aqui você pode acompanhar todas
        as empresas nas quais demonstrou interesse e está aguardando a análise do seu currículo.
      </p>

      <div className="pr-2 space-y-4 overflow-y-auto pb-2 md:max-h-[400px]">
        {talent_banks.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma empresa encontrada.</p>
        ) : (
          talent_banks.map((talent_bank) => (
            <TalentBankItem
              key={talent_bank.id}
              talent_bank={talent_bank}
              onClick={() => handleCompanyClick(talent_bank.company.id)}
              isOpen={selectedCompanyId === talent_bank.company.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
