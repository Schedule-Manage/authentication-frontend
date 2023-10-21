import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Media() {
  const [picked, setPicked] = useState();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [allHistory, setAllHistory] = useState<any[]>([]);
  const [allMusic, setAllMusic] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}music`)
      .then((res) => res.json())
      .then((data) => setAllMusic(data.data));
  }, [allMusic]);

  // Adding songs and getting all of song inside history
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}music/history/playlist/${picked}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data.data);
          setAllHistory(data.data);
        }
      });
  }, [picked]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}music/history/playlist`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAllHistory(data.data);
        }
      });
  }, [picked, allHistory]);

  const submitMusic = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("music", selectedFile);
      fetch(`${import.meta.env.VITE_SERVER_URL}music/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <Navbar />

      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="Add Music">Add Music</Tabs.Tab>
          <Tabs.Tab value="All Music">All Music</Tabs.Tab>
          <Tabs.Tab value="History">History</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Add Music">
          <form onSubmit={submitMusic}>
            <input
              type="file"
              accept="audio/mp3"
              onChange={(e: any) => setSelectedFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="All Music">
          <div>
            <p>All Music</p>
            {allMusic &&
              allMusic.map((music: any) => (
                <div
                  key={music._id}
                  onClick={() => {
                    setPicked(music._id);
                  }}
                >
                  <h1>{music.title}</h1>
                  {music.mimetype === "audio/mpeg" ? (
                    <audio controls>
                      <source src={music.audio_url} type={music.mimetype} />
                    </audio>
                  ) : (
                    <video controls>
                      <source src={music.audio_url} type={music.mimetype} />
                    </video>
                  )}
                </div>
              ))}
          </div>
        </Tabs.Panel>

        {allHistory && (
          <Tabs.Panel value="History">
            {allHistory && Array.isArray(allHistory) ? (
              allHistory.map((music: any) => (
                <div key={music._id}>
                  <h1>{music.title}</h1>
                  <audio controls>
                    <source src={music.audio_url} type="audio/mpeg" />
                  </audio>
                </div>
              ))
            ) : (
              <p>Loading or no data available.</p>
            )}
          </Tabs.Panel>
        )}
      </Tabs>

      <div></div>
    </div>
  );
}
