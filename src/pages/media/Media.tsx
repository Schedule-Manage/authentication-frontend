import Navbar from "../../components/navbar/Navbar";

export default function Media() {
  return (
    <div>
      <Navbar />
      <form>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
