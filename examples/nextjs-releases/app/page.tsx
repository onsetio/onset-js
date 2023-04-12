"use client"

import styles from './page.module.css'
import { loadPage } from '@onsetio/browser';
import ReleaseItem from '@/components/ReleaseItem';
import { useRouter, useSearchParams } from 'next/navigation';

export default async function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const project = searchParams.get('project') ?? undefined;

  const page = await loadPage('releases.onset.io');
  const releases = page.releases(project);
  const projects = page.projects();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let path = '/';

    if (event.target.value) {
      path = '/?project=' + event.target.value;
    }

    router.push(path);
  };

  return (
    <main className={styles.main}>
      <select className={styles.select} defaultValue={project} onChange={onChange}>
        <option value="">All</option>
        {projects.map(project => <option key={project.slug} value={project.slug}>{project.name}</option>)}
      </select>
      {releases.map(release => <ReleaseItem key={release.id} release={release} />)}
    </main>
  )
}
