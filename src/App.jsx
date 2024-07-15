import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

export default function App() {
  const [reviews, setReviews] = useState(() => {
    const saveReviews = localStorage.getItem("reviews");
    const reviews = JSON.parse(saveReviews);
    if (reviews) return reviews;

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  function updateFeedback(feedbackType) {
    if (feedbackType === "reset") {
      setReviews({
        ...reviews,
        good: 0,
        neutral: 0,
        bad: 0,
      });
    } else {
      setReviews({
        ...reviews,
        [feedbackType]: reviews[feedbackType] + 1,
      });
    }
  }

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;
  const totalPositive =
    totalFeedback > 0 ? Math.round((reviews.good / totalFeedback) * 100) : 0;

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />

      {totalFeedback > 0 ? (
        <Feedback
          reviews={reviews}
          totalFeedback={totalFeedback}
          totalPositive={totalPositive}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
