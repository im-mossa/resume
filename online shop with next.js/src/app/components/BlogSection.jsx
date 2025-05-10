"use client";

import React, { useEffect, useState } from "react";
import { useBlogApi } from "../hooks/useBlogApi";
import ItemSection from "./ItemSection";

export default function BlogSection() {
    const { getAllPosts } = useBlogApi();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts((data) => {
            setPosts(Array.isArray(data) ? data : []);
        });
    }, [getAllPosts]);

    return (
        <section className="">
            <h2 className="pt-4 text-center text-lg sm:text-xl md:text-2xl font-semibold">
                Blog
            </h2>

            <div className="w-[98%] mx-auto my-6 pt-2 h-auto overflow-x-auto overflow-y-hidden">
                <div className="flex gap-4 p-2">
                    {posts.map(({ id, title, image }) => (
                        <ItemSection
                            key={id}
                            id={id}
                            title={title}
                            image={image}
                            href={`/showBlog?id=${id}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
