// Generate blog page
const pagination = require('hexo-pagination');

hexo.extend.generator.register('blog', blogGenerator);

function blogGenerator(locals) {
    const config = this.theme.config;
    const posts = locals.posts.sort(config.blog_generator.order_by);

    posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

    const path =  config.blog_generator.path || '/blog';

    return pagination(path, posts, {
        perPage: config.blog_generator.per_page || 10,
        layout: ['blog'],
        format: '%d/',  // output path
        data: {}
    });
}


// Custom paginator
const hexo_util_1 = require("hexo-util");

hexo.extend.helper.register('pagination', paginationHelper);

const url_for = hexo.extend.helper.get('url_for').bind(hexo);

const createLink = (options, ctx) => {
    const { base, format } = options;
    return (i) => url_for(i === 1 ? base : '' + format.replace('%d', String(i)));
};
const createPageTag = (options, ctx) => {
    const link = createLink(options, ctx);
    const { current, escape, transform, page_class: pageClass, current_class: currentClass } = options;
    return (i) => {
        let tag = `<li class="page-item">`;
        if (i === current) {
            tag += (0, hexo_util_1.htmlTag)('span', { class: pageClass + ' ' + currentClass }, transform ? transform(i) : i, escape);
        } else {
            tag += (0, hexo_util_1.htmlTag)('a', { class: pageClass, href: link(i) }, transform ? transform(i) : i, escape);
        }
        tag += `</li>`;
        return tag;
    };
};
const showAll = (tags, options, ctx) => {
    const { total } = options;
    const pageLink = createPageTag(options, ctx);
    for (let i = 1; i <= total; i++) {
        tags.push(pageLink(i));
    }
};
const paginationPartShow = (tags, options, ctx) => {
    const { current, total, space, end_size: endSize, mid_size: midSize, space_class: spaceClass } = options;
    const leftEnd = Math.min(endSize, current - 1);
    const rightEnd = Math.max(total - endSize + 1, current + 1);
    const leftMid = Math.max(leftEnd + 1, current - midSize);
    const rightMid = Math.min(rightEnd - 1, current + midSize);
    const spaceHtml = (0, hexo_util_1.htmlTag)('span', { class: spaceClass }, space, false);
    const pageTag = createPageTag(options, ctx);
    // Display pages on the left edge
    for (let i = 1; i <= leftEnd; i++) {
        tags.push(pageTag(i));
    }
    // Display spaces between edges and middle pages
    if (space && leftMid - leftEnd > 1) {
        tags.push(spaceHtml);
    }
    // Display left middle pages
    for (let i = leftMid; i < current; i++) {
        tags.push(pageTag(i));
    }
    // Display the current page
    tags.push(pageTag(current));
    // Display right middle pages
    for (let i = current + 1; i <= rightMid; i++) {
        tags.push(pageTag(i));
    }
    // Display spaces between edges and middle pages
    if (space && rightEnd - rightMid > 1) {
        tags.push(spaceHtml);
    }
    // Display pages on the right edge
    for (let i = rightEnd; i <= total; i++) {
        tags.push(pageTag(i));
    }
};
function paginationHelper(options = {}) {
    options = Object.assign({
        base: this.page.base || '',
        current: this.page.current || 0,
        format: `blog/%d/`,
        total: this.page.total || 1,
        end_size: 1,
        mid_size: 2,
        space: '&hellip;',
        next_text: 'Next',
        prev_text: 'Prev',
        prev_next: false,
        escape: true,
        page_class: 'page-link text-primary-700 rounded-1 border-0',
        current_class: 'active',
        space_class: 'space',
        prev_class: 'extend prev',
        next_class: 'extend next',
        force_prev_next: false
    }, options);
    const { current, total, prev_text: prevText, next_text: nextText, prev_next: prevNext, escape, prev_class: prevClass, next_class: nextClass, force_prev_next: forcePrevNext } = options;
    if (!current)
        return '';
    const link = createLink(options, this);
    const tags = [];
    // Display the link to the previous page
    if (prevNext && current > 1) {
        tags.push((0, hexo_util_1.htmlTag)('a', { class: prevClass, rel: 'prev', href: link(current - 1) }, prevText, escape));
    }
    else if (forcePrevNext) {
        tags.push((0, hexo_util_1.htmlTag)('span', { class: prevClass, rel: 'prev' }, prevText, escape));
    }
    if (options.show_all) {
        showAll(tags, options, this);
    }
    else {
        paginationPartShow(tags, options, this);
    }
    // Display the link to the next page
    if (prevNext && current < total) {
        tags.push((0, hexo_util_1.htmlTag)('a', { class: nextClass, rel: 'next', href: link(current + 1) }, nextText, escape));
    }
    else if (forcePrevNext) {
        tags.push((0, hexo_util_1.htmlTag)('span', { class: nextClass, rel: 'next' }, nextText, escape));
    }
    return tags.join('');
}