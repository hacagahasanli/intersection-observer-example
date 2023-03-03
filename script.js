let currentPage = 1;

const scrollFetchingObserver = new IntersectionObserver(
    ([entry], observer) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            getPosts(++currentPage)
        }
    },
    {
        rootMargin: "100px",
        // threshold: 1,
    }
);


const getPosts = (page = 1) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8&_page=${page}`)
        .then(res => res.json())
        .then(posts => {
            posts.map(({ id, title, body }) => {
                const card = document.createElement('div');
                card.innerHTML = `
                    <h5>${id}</h5>
                    <h3>${title}</h3>
                    <p>${body}</p>
                `;
                card.className = "card";
                document.body.append(card)
            })
            const lastCard = document.querySelector('.card:last-child');
            scrollFetchingObserver.observe(lastCard)
        })
        .catch((err) => console.log(err))
}

getPosts()