import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Media() {
  const [selectedFile, setSelectedFile] = useState();
  const [allMusic, setAllMusic] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}music`)
      .then((res) => res.json())
      .then((data) => setAllMusic(data.data));
  }, []);

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

      <div>
        <form onSubmit={submitMusic}>
          <input
            type="file"
            onChange={(e: any) => setSelectedFile(e.target.files[0])}
          />
          <button type="submit">Upload</button>
        </form>

        <div>
          <h1>All Music</h1>
          {allMusic &&
            allMusic.map((music: any) => {
              return (
                // <div>
                  <audio controls>
                    <source
                      src={music.audio_url}
                      type={music.mimetype}
                    ></source>
                  </audio>
                // </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
