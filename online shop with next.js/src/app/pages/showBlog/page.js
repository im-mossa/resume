"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useBlogApi } from "@/app/hooks/useBlogApi";

export default function ShowBlog() {
    const searchParams = useSearchParams();
    const blogId = searchParams.get("id");

    const { getPostById } = useBlogApi();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogId) {
            getPostById(blogId, (dataList) => {
                const data = dataList?.[0];
                if (data) setBlog(data);
            });
        }
    }, [blogId, getPostById]);

    if (!blog) {
        return (
            <main className="text-center py-10">
                <p>Loading blog...</p>
                <img src="/images/loading-gif.gif" alt="loading" className="mx-auto w-24" />
            </main>
        );
    }

    return (
        <main>
            <section className="max-w-4xl mx-auto px-4 py-6">
                <img
                    src={blog.image || "/images/loading-gif.gif"}
                    alt="blog"
                    className="w-full max-h-[400px] object-cover rounded-lg"
                />

                <h1 className="text-2xl sm:text-3xl font-bold my-4">{blog.title}</h1>

                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
                    {blog.subTitle}
                </h3>

                <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
                    {blog.description}
                </p>

                <div className="text-sm text-gray-600 space-y-2">
                    <div>
                        <strong>{blog.visitCount}</strong> Visited
                    </div>
                    <div>
                        Date of writing:{" "}
                        <span>{new Date(blog.addDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
