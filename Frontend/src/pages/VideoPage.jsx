import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import usePostStore from "../store/usePostStore";
import AppLayout from "../layout/AppLayout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const VideoPage = () => {
  const { id } = useParams();
  const { getPostById, getRandomPosts } = usePostStore();

  const [post, setPost] = useState(null);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
 
  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPostById(id);
      setPost(result);
    };
    fetchPost();
  }, [id, getPostById]);

  useEffect(() => {
    const fetchSuggested = async () => {
      const results = await getRandomPosts(5);
      setSuggestedPosts(results.filter(p => p._id !== id)); // exclude current post
    };
    fetchSuggested();
  }, [id, getRandomPosts]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-base-100 p-4 mt-2">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Video Section */}
          <div className="flex-1 w-full">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-md">
              <a
                target="_blank"
                href={post?.link1 || `https://www.profitableratecpm.com/d3wik33at?key=eb07cf95bb0f2a22aaa1a0c687e796bb`}
                className="block w-full h-full relative"
              >
                <figure className="relative w-full h-full">
                  <img
                    src={post?.image}
                    alt={post?.title || "Video"}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
                    <button className="p-4 rounded-full bg-blue-700 text-2xl">
                      ▶
                    </button>
                  </div>
                </figure>
              </a>
            </div>

            <h2 className="text-xl font-semibold mt-4">
              {post?.title || "Video Title Here"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Uploaded by {post?.author || "User"} ·{" "}
              {dayjs(post?.createdAt).fromNow()} · {`${(Math.random() * 4 + 1).toFixed(1)}M`} views
            </p>
            <p className="mt-3 text-sm">
              {post?.description || "No description provided."}
            </p>
            <div className="flex items-center justify-center flex-wrap gap-2 my-12">
              <Link to={post?.link2 || `https://www.profitableratecpm.com/zt917cma?key=e1da7b3b8deb6820e7773eac46148be0`} className="btn btn-neutral">Watch 4k UHD</Link>
              <Link to={post?.link3 || `https://www.profitableratecpm.com/gs7t21z0ue?key=9752817f5b3f8acb5714c4a2d2b8a0ee`}  className="btn btn-neutral">Watch 1080p HEVC</Link>
              <Link to={post?.link4 || `https://www.profitableratecpm.com/y3v6365wh6?key=ec9c2a5369bb5adf6a81de4021d32794`}  className="btn btn-neutral">Watch 720p HEVC</Link>
              <Link to={post?.link2 || `https://www.profitableratecpm.com/zt917cma?key=e1da7b3b8deb6820e7773eac46148be0`}  className="btn btn-neutral">Download 4k UHD</Link>
              <Link to={post?.link3 || `https://www.profitableratecpm.com/gs7t21z0ue?key=9752817f5b3f8acb5714c4a2d2b8a0ee`}  className="btn btn-neutral">Download 1080p HEVC</Link>
              <Link to={post?.link4 || `https://www.profitableratecpm.com/y3v6365wh6?key=ec9c2a5369bb5adf6a81de4021d32794`}  className="btn btn-neutral">Download 720p HEVC</Link>
            </div>
          </div>

          {/* Suggested Videos */}
          <div className="w-full lg:w-2/6 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-3">Suggested Videos</h3>
            <div className="space-y-4">
              {suggestedPosts.map((suggested) => (
                <Link
                  to={`/video/${suggested._id}`}
                  key={suggested._id}
                  className="flex gap-3 items-start cursor-pointer hover:bg-base-200 p-2 rounded-lg transition"
                >
                  <img
                    src={suggested.image}
                    alt={suggested.title}
                    className="w-1/2 h-28 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold line-clamp-2">
                      {suggested.title}
                    </p>
                    <p className="text-xs text-gray-500">
                    {suggested.author || "User"} · {`${(Math.random() * 4 + 1).toFixed(1)}M`} views

                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoPage;
