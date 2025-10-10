import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL

  return (
    <div className="text-white p-4 bg-black min-h-screen">
      <h1 className="text-2xl font-bold">Movie Details Page</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
}
