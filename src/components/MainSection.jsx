import { posts as initialPosts } from '../data/posts.js'
import { Card, setClass } from './Card.jsx'
import style from './MainSection.module.css'
import { useState } from 'react';





const postsTags = initialPosts.map(post => post.tags).flat()

function filtraTagUnici(array) {
    return array.filter((el, i) => array.indexOf(el) === i);
}

// console.log(filtraTagUnici(postsTags))


export default function MainSection() {

    const [posts, setPosts] = useState(initialPosts);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');


    function addPost(e) {
        e.preventDefault();

        const newTitle = title;
        const newAuthor = author;

        const newPost = {
            id: Date.now(),
            title: newTitle,
            image: '' /* compila questo campo */,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
            tags: ['html', 'css'],
            published: true,
            author: newAuthor
        };


        setPosts([...posts, newPost]);
        setTitle('');
        setAuthor('');

    }


    function deletePost(currentPost) {
        setPosts(posts.filter(post => post !== currentPost))

    }


    function updateTitle(cardtitle, id) {

        setPosts((oldPosts) => oldPosts.map((post) => post.id === id ? { ...post, title: cardtitle } : post))
        console.log(posts)

    }





    return (
        <main>
            <section>
                <div className="container">
                    <form onSubmit={addPost} action="" className="main_form" >
                        <input type="text" placeholder="titolo" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder="Autore" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        {/* <input type="radio" />
                        <input type="radio" /> */}
                        <input type="submit" value="Aggiungi post" />
                    </form>
                </div>
            </section>
            <section className='main_section'>
                <div className="container">
                    <div className="row">
                        {posts.map((post) => (
                            post.published &&
                            <div key={post.id} className="col_4">
                                <Card id={post.id} title={post.title} image={post.image} description={post.content} tags={post.tags} author={post.author} deleteFunction={() => deletePost(post)} onUpdateTitle={updateTitle} />
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            <section>
                <div className="tags">
                    {filtraTagUnici(postsTags).map((tag, i) => (
                        <div className={setClass(tag, tag)} key={i}>{tag}</div>

                    ))}

                </div>
            </section>
        </main>
    )
}