import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Media() {
  const [selectedFile, setSelectedFile] = useState();

  const submitMusic = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("music", selectedFile);

    fetch(`${import.meta.env.VITE_SERVER_URL}music/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <Navbar />
      music/upload
      <form onSubmit={submitMusic}>
        <input
          type="file"
          onChange={(e: any) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
