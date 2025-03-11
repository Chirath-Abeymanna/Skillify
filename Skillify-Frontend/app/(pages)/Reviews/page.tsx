import ReviewForm from "@/components/Review";

const ReviewsPage: React.FC = () => {
  return (
    <div className="bg-reviewGlass my-20 p-8 rounded-3xl shadow-lg backdrop-blur-md bg-opacity-40 max-w-4xl mx-auto">
      <ReviewForm />
    </div>
  );
};

export default ReviewsPage;

