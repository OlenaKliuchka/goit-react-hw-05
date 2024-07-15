import styles from "./Options.module.css";

export default function Options({ updateFeedback, totalFeedback }) {
  return (
    <>
      <button className={styles.button} onClick={() => updateFeedback("good")}>
        Good
      </button>

      <button
        className={styles.button}
        onClick={() => updateFeedback("neutral")}
      >
        Neutral
      </button>

      <button className={styles.button} onClick={() => updateFeedback("bad")}>
        Bad
      </button>

      {totalFeedback ? (
        <button
          className={styles.button}
          onClick={() => updateFeedback("reset")}
        >
          Reset
        </button>
      ) : null}
    </>
  );
}
