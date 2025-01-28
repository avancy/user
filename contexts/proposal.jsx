import { getUploadUrlProposal } from '@/lib/functions/proposal';
import { createContext, useContext, useState } from 'react';
import SYS_TEMPLATES from '@/lib/system/templates';
import { uploadFile } from '@/util/xlsx';
import { api } from '@/lib/api';

const ProposalContext = createContext();

export function ProposalProvider({ children }) {
  const [isProposalMenuOpen, setIsProposalMenuOpen] = useState(false);
  const [proposalStep, setProposalStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [proposal, setProposal] = useState({});

  const toggleProposalMenu = () => {
    setIsProposalMenuOpen(!isProposalMenuOpen);
  };

  const updateProposal = (job_proposal) => {
    setProposal(job_proposal);
  };

  const nextProposalStep = () => {
    setProposalStep((prev) => {
      const nextStep = prev + 1;
      if (!completedSteps.includes(nextStep)) {
        setCompletedSteps([...completedSteps, prev]);
      }
      return nextStep;
    });
  };

  const previousProposalStep = async (step) => {
    proposal?.id &&
      (await api
        .get(`/jobs/proposal/${proposal?.id}/form_${step}/form`)
        .then(({ data }) => {
          api.delete(`/jobs/proposal/form/${data?.id}`);
        })
        .catch((e) => console.error(e)));
    setProposalStep(step);
  };

  const resetProposal = () => {
    setProposalStep(0);
  };

  const saveApplicantInfo = async (step, data, type = 'form') => {
    const existingApplicantInfo = sessionStorage.getItem(
      `@applicant_info_proposal_${proposal?.id || ''}`,
    );

    const applicantInfoArray = existingApplicantInfo ? JSON.parse(existingApplicantInfo) : [];
    const updatedArray = applicantInfoArray.filter((info) => info.step !== step);
    updatedArray.push({ step, data });

    sessionStorage.setItem(
      `@applicant_info_proposal_${proposal?.id || ''}`,
      JSON.stringify(updatedArray),
    );

    if (type === 'form') {
      const [template_url, uploadUrlRes] = await Promise.all([
        SYS_TEMPLATES.PROPOSAL_FORM[step - 1](),
        getUploadUrlProposal(proposal?.id, `form_${step}.xlsx`, `form_${step}`),
      ]);

      if (!uploadUrlRes) {
        throw new Error('Erro ao buscar URL de upload');
      }

      if (!uploadUrlRes?.URL) {
        throw new Error('Erro ao buscar URL de upload');
      }

      if (!template_url) {
        throw new Error('Erro ao buscar URL de template');
      }

      const { error } = await uploadFile({
        data: step === 4 ? data.dependents : data,
        template_url,
        upload_url: uploadUrlRes?.URL,
        headers: uploadUrlRes?.SignedHeader,
        method: uploadUrlRes?.Method,
      });

      if (error) {
        throw 'Erro ao fazer upload do arquivo';
      }
    }
  };

  const getApplicantInfo = (step) => {
    const applicantInfo = sessionStorage.getItem(`@applicant_info_proposal_${proposal?.id || ''}`);

    if (applicantInfo) {
      const parsedInfo = JSON.parse(applicantInfo);
      const stepData = parsedInfo.find((info) => info.step === step);

      return stepData ? stepData.data : null;
    }

    return null;
  };

  return (
    <ProposalContext.Provider
      value={{
        previousProposalStep,
        toggleProposalMenu,
        saveApplicantInfo,
        getApplicantInfo,
        nextProposalStep,
        updateProposal,
        setIsAlertOpen,
        resetProposal,
        isProposalMenuOpen,
        proposalStep,
        isAlertOpen,
        proposal,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposalContext() {
  return useContext(ProposalContext);
}
