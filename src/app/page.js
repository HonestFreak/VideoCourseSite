'use client'
import { useState, useEffect } from "react";

export default function Home() {
  const [sidepanel, setSidepanel] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [progress, setProgress] = useState([])
  const [ total , setTotal] = useState(0)

  const dataCalc = (array) => {
    let length = 0;
    array.forEach((item, index) => {
      length += item.chapters.length;
    });

    return length;
  };

  const array = [{
    title: "Mihir MMS Leak",
    chapters: [
      {
        title: "Mihir Bds",
        video: "https://www.youtube.com/embed/ih3J0UbXjto?si=5THEYMDKiilRs4ie"
      },
      {
        title: "Mihir dk",
        video: "https://www.youtube.com/embed/s6J2o3gyVzU?si=aOUN0CoDm2aFttjV"
      },
    ]
  }
  ]

  const [video, setVideo] = useState("https://www.youtube.com/embed/ih3J0UbXjto?si=5THEYMDKiilRs4ie")

  useEffect(() => {
    const length = dataCalc(array)
    const currentChapter = localStorage.getItem('currentChapter') || array[0].chapters[0].video
    setCurrentChapter(currentChapter)
    const progress = JSON.parse(localStorage.getItem('progress')) || []
    setProgress(progress) // array of urls
    setTotal(length);
  }, [])

  return (
    <>
      <div className="h-screen flex flex-row">
        {/* sidepanel */}
        {sidepanel ? <div className="bg-green-500 h-screen w-1/4 drop-shadow-xl">

          <div className="bg-[#14089C] h-1/5">
            <div className="flex p-3 h-8 w-full hover:cursor-pointer">
              <h1 className="text-sm italic w-3/4">Back to home page</h1>
              <h1 className="font-bold text-right w-1/4" onClick={() => { setSidepanel(!sidepanel) }}> &lt;&lt; </h1>
            </div>

            <div className="flex flex-col h-4/5 w-full p-5 gap-y-3">
              <div className="text-xl font-bold">  Mihir Plus Batch </div>
              <div className="flex items-center	gap-3">
                <div className="bg-blue-900 rounded-lg h-1 w-full">
                  <div className={`bg-green-400 h-1 rounded-md`} style={{ width: `${(progress.length / total) * 100}%` }} />
                </div>
                {progress.length / total * 100 }%
              </div>
            </div>
          </div>

          {/* chapter list */}
          <div className="scrollbar-thumb-rounded-full
          w-full h-4/5 bg-white overflow-y-scroll	scrollbar-thin scrollbar-thumb-blue-500 scrollbar">

            {array.map((item, index) => {
              return (
                <details open className="border bg-white p-3 py-4 gap-y-3 text-gray-500 cursor-pointer">
                  <summary className="font-medium ">  {item.title} </summary>
                  {item.chapters.map((chapter, index) => {
                    return (
                      <div className="flex items-center gap-3 p-2 text-lg cursor-pointer">
                        <div className={`text-sm font-medium ${(currentChapter === chapter.video) && 'text-gray-900'}
                         ${progress.includes(chapter.video) && ' text-green-600'}`}
                          onClick={() => {
                            setVideo(chapter.video);
                            setCurrentChapter(chapter.video);

                            // Use spread operator to create a new array with the updated progress
                            if( progress.includes(chapter.video) ) return;
                            const updatedProgress = [...progress, chapter.video];

                            setProgress(updatedProgress);
                            localStorage.setItem('currentChapter', chapter.video);
                            localStorage.setItem('progress', JSON.stringify(updatedProgress));

                            console.log(updatedProgress);
                            console.log(localStorage.getItem('progress'));
                          }}
                        > {chapter.title} </div>
                      </div>
                    )
                  })}
                </details>
              )
            })}


          </div>
        </div> :
          <div className="cursor-pointer font-bold text-lg items-center p-3 flex bg-[#37A6FE] h-screen w-8 drop-shadow-xl"
          onClick={() => {
            setSidepanel(!sidepanel)
          }}
          >
            &gt;
          </div>
        }
        {/* video section */}
        <div className="bg-blue-300 h-screen w-full flex flex-col">
          <div className="bg-[#37A6FE] h-min flex px-10 font-bold items-center">
            <div className="w-full cursor-pointer "
             onClick={() => {
              if( currentChapter === array[0].chapters[0].video ) {
                return;
              }
              const currentIndex = array[0].chapters.findIndex((chapter) => chapter.video === currentChapter);
              setVideo(array[0].chapters[currentIndex - 1].video);
              setCurrentChapter(array[0].chapters[currentIndex - 1].video);

            }
            }
            > &lt; prev </div>
            <div className="w-full text-right cursor-pointer"
             onClick={() => {
              if( currentChapter === array[0].chapters[array[0].chapters.length - 1].video ) {
                return;
              }
              const currentIndex = array[0].chapters.findIndex((chapter) => chapter.video === currentChapter);
              setVideo(array[0].chapters[currentIndex + 1].video);
              setCurrentChapter(array[0].chapters[currentIndex + 1].video);
             }}
            >  next &gt; </div>
          </div>

          <div className="flex-1 w-full">
            <iframe width="100%" height="100%" src={video + "&rel=0"} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
