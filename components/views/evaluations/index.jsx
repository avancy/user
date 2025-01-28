import GridEvaluations from '../../evaluation/grid';
import JobManager from '@/classes/job';

export default function Evaluations({ evaluations }) {
  const sortEvaluations = async (evaluations) => {
    const jobIds = [...new Set(evaluations.map((e) => e.stage.job_id))];
    let jobs = [];
    await Promise.all(
      jobIds.map(async (jobId) =>
        JobManager.get({ id: jobId, onSucess: (data) => jobs.push({ jobId, job: data }) }),
      ),
    );

    const jobMap = jobs.reduce((map, { jobId, job }) => {
      map[jobId] = job;
      return map;
    }, {});
    const result = evaluations.reduce((acc, curr) => {
      const jobId = curr.stage.job_id;

      if (!acc[jobId]) {
        acc[jobId] = { job: jobMap[jobId], evaluations: [] };
      }

      acc[jobId].evaluations.push(curr);

      return acc;
    }, {});

    return result;
  };

  return (
    <div className="flex flex-col flex-grow px-4 md:px-6 xl:mx-32 xl:px-0">
      <GridEvaluations evaluations={evaluations} sortEvaluations={sortEvaluations} />
    </div>
  );
}
