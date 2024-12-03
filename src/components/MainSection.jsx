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

    //================= VARIABILI REATTIVE

    const [posts, setPosts] = useState(initialPosts);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        image: '',
        isPublished: true,
        tags: []

    });
    // ======================================= HANDLE DEL FORM
    function handleFormData(e) {


        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData((formData) => (
            {
                ...formData,
                [e.target.name]: value
            }
        ))

    }



    //================================================  FUNZIONE AGGIUNGERE UN POST 


    function addPost(e) {
        e.preventDefault();

        // const newTitle = title;
        // const newAuthor = author;

        const newPost = {
            id: Date.now(),
            // title: newTitle,
            // image: '' /* compila questo campo */,
            // content:
            //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
            // tags: ['html', 'css'],
            // published: true,
            // author: newAuthor
            ...formData
        };


        setPosts([...posts, newPost]);
        // setTitle('');
        // setAuthor('');
        setFormData({
            title: '',
            author: '',
            image: '',
            isPublished: true,
            tags: []
        })

    }

    //================================================  FUNZIONE ELIMINARE UN POST 

    function deletePost(currentPost) {
        setPosts(posts.filter(post => post !== currentPost))

    }
    //================================================  FUNZIONE MODIFICARE UN POST 

    function updateTitle(cardtitle, id) {

        setPosts((oldPosts) => oldPosts.map((post) => post.id === id ? { ...post, title: cardtitle } : post))
        console.log(posts)

    }

    // ==============================  HTML

    return (
        <main>
            <section>
                <div className="container">

                    <form onSubmit={addPost} action="" className="main_form" >
                        <div>
                            <label htmlFor="title">Nome</label>
                            <input type="text" name='title' placeholder="titolo" value={formData.title} onChange={handleFormData} />
                        </div>

                        <div>
                            <label htmlFor="author">Autore</label>
                            <input type="text" name='author' placeholder="Autore" value={formData.author} onChange={handleFormData} />
                        </div>

                        <div>
                            <label htmlFor="image">Immagine</label>
                            <input type="text" name='image' placeholder="immagine" value={formData.image} onChange={handleFormData} />
                        </div>

                        <div>
                            <h4>tags</h4>
                            <ul>
                                <li>
                                    <input type="checkbox" />
                                    <label htmlFor="isPublished">html</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label htmlFor="isPublished">css</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label htmlFor="isPublished">js</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label htmlFor="isPublished">php</label>
                                </li>

                            </ul>
                        </div>

                        <div>
                            <label htmlFor="isPublished">pubblicato</label>
                            <input type="checkbox" name='isPublished' checked={formData.isPublished} onChange={handleFormData} />
                        </div>

                        <input type="submit" value="Aggiungi post" />
                    </form>

                </div>

            </section>
            <section className='main_section'>
                <div className="container">
                    <div className="row">
                        {posts.map((post) => (
                            <div key={post.id} className="col_4">
                                <Card id={post.id} title={post.title} image={post.image} description={post.content} tags={post.tags} author={post.author} isPublished={post.isPublished} deleteFunction={() => deletePost(post)} onUpdateTitle={updateTitle} />
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