"use client";

import { useEffect, useState } from "react";

const allowedRepos = [
  "ia_reinforcement_learning",
  "survetric",
  "flamingo",
  "ardu-arm",
];

interface Project {
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
}

export const useGithubProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.github.com/users/forbrig/repos?per_page=100&sort=updated"
        );
        const repos: Project[] = await response.json();
        console.log("Fetched GitHub repos:", repos);
        const filtered = repos
          .filter((repo) => allowedRepos.includes(repo.name.toLowerCase()))
          .map((repo) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            language: repo.language,
            topics: repo.topics,
          }));

        setProjects(filtered);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, isLoading };
};
