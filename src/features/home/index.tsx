import { useAuthStore } from "../auth/store/useAuthStore";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

const Home = () => {
  const { user } = useAuthStore();

  // Mock data for stories and posts
  const stories = [
    { id: 1, name: "Your Story", img: user?.profile_pic, isUser: true },
    { id: 2, name: "alex_designs", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "sam_dev", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "react_coder", img: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "ui_ux_daily", img: "https://i.pravatar.cc/150?u=5" },
  ];

  const posts = [
    {
      id: 1,
      username: "sam_dev",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800",
      caption:
        "Building something cool with React and Tailwind! 🚀 #coding #webdev",
      likes: 1240,
    },
    {
      id: 2,
      username: "ui_ux_daily",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      caption: "Clean dark mode interfaces are the best. What do you think?",
      likes: 850,
    },
  ];

  return (
    <div className="max-w-[850px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
      {/* Left Column: Stories & Feed */}
      <div className="lg:col-span-8 space-y-4">
        {/* Stories Section */}
        <div className="bg-black border border-gray-800 rounded-xl p-4 flex space-x-4 overflow-x-auto no-scrollbar">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer"
            >
              <div
                className={`p-[2px] rounded-full ${story.isUser ? "bg-gray-700" : "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"}`}
              >
                <div className="bg-black p-[2px] rounded-full">
                  <img
                    src={story.img || "https://i.pravatar.cc/150"}
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-400 w-16 truncate text-center">
                {story.name}
              </span>
            </div>
          ))}
        </div>

        {/* Feed Section */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Column: Suggestions (Hidden on Mobile) */}
      <div className="hidden lg:block lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profile_pic || "https://i.pravatar.cc/150"}
              className="w-12 h-12 rounded-full border border-gray-800"
            />
            <div>
              <p className="text-sm font-bold">
                {user?.user_name || "user_123"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          </div>
          <button className="text-xs font-bold text-blue-500 hover:text-white">
            Switch
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-gray-500">Suggested for you</p>
            <button className="text-xs font-bold hover:text-gray-400">
              See All
            </button>
          </div>
          {/* Mock Suggestion */}
          <SuggestionItem name="framer_guy" />
          <SuggestionItem name="tailwind_fan" />
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const PostCard = ({ post }: any) => (
  <article className="bg-black border border-gray-800 rounded-xl overflow-hidden">
    {/* Post Header */}
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px] rounded-full">
          <div className="bg-black p-[1px] rounded-full">
            <img
              src={`https://i.pravatar.cc/150?u=${post.username}`}
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-bold hover:text-gray-400 cursor-pointer">
            {post.username}
          </p>
          <p className="text-[10px] text-gray-500">{post.location}</p>
        </div>
      </div>
      <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
    </div>

    {/* Post Image */}
    <div className="aspect-square bg-gray-900 flex items-center justify-center">
      <img
        src={post.image}
        className="w-full h-full object-cover"
        alt="post content"
      />
    </div>

    {/* Post Actions */}
    <div className="p-3 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Heart className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
          <MessageCircle className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
          <Send className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
        </div>
        <Bookmark className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
      </div>

      <div>
        <p className="text-sm font-bold">{post.likes.toLocaleString()} likes</p>
        <p className="text-sm mt-1">
          <span className="font-bold mr-2">{post.username}</span>
          {post.caption}
        </p>
      </div>

      <div className="pt-1">
        <p className="text-xs text-gray-500 cursor-pointer uppercase tracking-tighter">
          View all 42 comments
        </p>
        <div className="mt-2 flex items-center justify-between">
          <input
            type="text"
            placeholder="Add a comment..."
            className="bg-transparent text-sm w-full outline-none"
          />
          <button className="text-blue-500 text-sm font-bold opacity-0 hover:opacity-100 transition-opacity">
            Post
          </button>
        </div>
      </div>
    </div>
  </article>
);

const SuggestionItem = ({ name }: { name: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <img
        src={`https://i.pravatar.cc/150?u=${name}`}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <p className="text-xs font-bold">{name}</p>
        <p className="text-[10px] text-gray-500">
          Followed by alex_dev + 2 more
        </p>
      </div>
    </div>
    <button className="text-xs font-bold text-blue-500">Follow</button>
  </div>
);

export default Home;
