import { Tabs, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Media() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [selectedFile, setSelectedFile] = useState();
  const [allMusic, setAllMusic] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}music`)
      .then((res) => res.json())
      .then((data) => setAllMusic(data.data));
  }, [allMusic]);

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

      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab
            value="Add Music"
            leftSection={<IconPhoto style={iconStyle} />}
          >
            Add Music
          </Tabs.Tab>
          <Tabs.Tab
            value="All Music"
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            All Music
          </Tabs.Tab>
          <Tabs.Tab
            value="History"
            leftSection={<IconSettings style={iconStyle} />}
          >
            History
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Add Music">
          <form onSubmit={submitMusic}>
            <input
              type="file"
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
                <div key={music._id} onClick={() => console.log(music._id)}>
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

        <Tabs.Panel value="History">Settings tab content</Tabs.Panel>
      </Tabs>

      <div></div>
    </div>
  );
}
