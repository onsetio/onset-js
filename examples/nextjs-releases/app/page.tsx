import styles from "./page.module.css";
import OnsetBrowserClient from "@onsetio/browser";
import ReleaseItem from "@/components/ReleaseItem";

export default async function Home() {
  const client = new OnsetBrowserClient("releases.onset.io");
  const releases = await client.releases.fetch();

  return (
    <main className={styles.main}>
      {releases.map((release) => (
        <ReleaseItem key={release.id} release={release} />
      ))}
    </main>
  );
}
