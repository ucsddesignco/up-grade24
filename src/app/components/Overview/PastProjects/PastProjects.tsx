import './PastProjects.scss';

type PastProject = {
  name: string;
  link: string;
};

type PastProjectsType = {
  pastProjects: PastProject[];
};

export default function PastProjects({ pastProjects }: PastProjectsType) {
  return (
    <div className="past-projects-container">
      <h3>{`Check out our past cohort's completed projects →`}</h3>
      <ul className="past-projects">
        {pastProjects.map(project => (
          <li key={project.name}>
            <a href={project.link} target="_blank" rel="noreferrer noopener">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
