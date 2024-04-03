hexo.extend.helper.register('list_blog_posts', listPostsHelper);

const url_for = hexo.extend.helper.get('url_for').bind(hexo);

function listPostsHelper(posts, options) {
    if (!options && (!posts || !Object.prototype.hasOwnProperty.call(posts, 'length'))) {
        options = posts;
        posts = this.site.posts;
    }
    options = options || {};
    const { style = 'list', transform, separator = ', ' } = options;
    const orderby = options.orderby || 'date';
    const order = options.order || -1;
    // const className = options.class || 'post';
    const amount = options.amount || 6;

    const ul_className = `d-flex flex-column row-gap-7 row-gap-lg-9 gx-9 gx-lg-4 col-12 col-lg-9 mt-9 mt-lg-0 mb-0 pt-9 pt-lg-0`;

    // Sort the posts
    posts = posts.sort(orderby, order);
    // Limit the number of posts
    if (amount)
        posts = posts.limit(amount);
    let result = '';
    if (style === 'list') {
        result += `<ul class="${ul_className}">`;
        posts.forEach(post => {
          const imgRegex = /<img[^>]*>/g;
          const content = post.content.replace(imgRegex, '');   // prevent image appear
          const title = post.title || post.slug;
          const date = new Date(post.date).toLocaleDateString('zh-tw');

          result += `<li class="card border-0">
            <article class="row g-0">
              <div class="col-12 col-lg-4">
                <img
                  src="${post.cover}"
                  class="img-fluid w-100 h-100 object-fit-cover rounded-3"
                  alt="article-${post.title}"
                >
              </div>
              <div class="col-12 col-lg-8">
                <div class="card-body pt-lg-0 pe-lg-0">
                  <div class="d-flex justify-content-between justify-content-lg-start align-items-center gap-3 mb-3">
                    <p class="card-text mb-0 fs-6 text-primary-600">
                      <small class="text-body-secondary">
                        ${date}
                      </small>
                    </p>`;

          post.tags.forEach((tag) => {
            result +=  `<span class="badge fs-6 lh-base fw-normal text-primary-700 bg-primary-200 rounded-4">
                        ${tag.name}
                      </span>`;
          });

          result +=  `</div>
                  <h5 class="card-title mb-3 text-primary-700">
                    ${title}
                  </h5>
                  <div class="cutoff-text mb-0 text-primary-700">
                    ${content}
                  </div>
                  <a class="stretched-link" href="${url_for(post.path)}"></a>
                </div>
              </div>
            </article>
          </li>`;
        });
        result += '</ul>';
    }
    else {
        posts.forEach((post, i) => {
            if (i)
                result += separator;
            const title = post.title || post.slug;
            result += `<a class="${className}-link" href="${url_for(post.path)}">`;
            result += transform ? transform(title) : title;
            result += '</a>';
        });
    }
    return result;
}
