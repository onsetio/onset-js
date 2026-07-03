import { Release } from "@onsetio/browser";
import styles from "./release-item.module.css";

export default function ReleaseItem({ release }: { release: Release }) {
  console.log("ReleaseItem", release);
  return (
    <article className={styles.release}>
      <h3 className={styles.title}>{release.title}</h3>
      {/* <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: release.body }}
      ></div> */}
      {/* {release.change_list && (
        <ul className={styles.changes}>
          {release.change_list.map((change, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: change.description }}
            ></li>
          ))}
        </ul>
      )} */}
    </article>
  );
}
