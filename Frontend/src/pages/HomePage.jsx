import React, { useEffect } from "react";
import AppLayout from "../layout/AppLayout";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import usePostStore from "../store/usePostStore";

const HomePage = () => {
  const { getPosts, posts, hasMore, page } = usePostStore();

  // Load first page on mount
  useEffect(() => {
    getPosts({ page: 1 });
  }, []);

  // Load more posts when scrolled to bottom
  const fetchMorePosts = () => {
    getPosts({ page: page + 1 });
  };

  return (
    <AppLayout>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<div className="text-center"><span className="loading loading-infinity mt-6  w-14"></span></div>}
        endMessage={<p className="text-center uppercase opacity-30 text-gray-400 font-bold text-2xl mt-6">No more posts</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {posts.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </InfiniteScroll>
    </AppLayout>
  );
};

export default HomePage;

