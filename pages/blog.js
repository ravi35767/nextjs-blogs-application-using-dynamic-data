import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
// import styles from '../styles/Blog.module.css'
import Link from "next/link";
import * as fs from 'fs';
// Step 1: Collect all the files from the blogdata directory
// Step 2: Iterate through them and Display them

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
//   useEffect(() => {
//     console.log("useeffect is running");
//     fetch("http://localhost:3000/api/blogs")
//       .then((a) => {
//         return a.json();
//       })
//       .then((parsed) => {
//         console.log(parsed);
//         setBlogs(parsed);
//       });
//   }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {blogs.map((blogitem) => {
          return (
            <div key={blogitem.slug}>
              <Link href={`/blogpost/${blogitem.slug}`}>
                <h3 className={styles.blogItemh3}>{blogitem.title}</h3>
              </Link>
              <p className={styles.blogItemp}>
                {blogitem.content.substr(0, 140)}...
              </p>
            </div>
          );
        })}
      </main>
    </div>
  );
};
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    console.log(item)
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }

  return {
    props: { allBlogs }, // will be passed to the page component as props
  };
}
export default Blog;
