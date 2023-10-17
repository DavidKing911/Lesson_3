export function render(data) {
    function renderBlock(blockName) {
        const block = document.createElement('div');
        const blockTitle = document.createElement('h2');
        const blockList = document.createElement('ol');
        const arrBlock = [];

        block.classList.add(blockName);
        blockList.classList.add('list');

        blockTitle.textContent = blockName[0].toUpperCase() + blockName.slice(1);

        for (let url of data[blockName]) {
            arrBlock.push(fetch(url).then(res => res.json()));
        }

        Promise.all(arrBlock).then(res => {
            for (let elem of res) {
                let li = document.createElement('li');
                li.textContent = elem.name;
                blockList.append(li);
            }
        })
        
        block.append(blockTitle);
        block.append(blockList);

        return block;
    }

    const container = document.createElement('div');
    const h1 = document.createElement('h1');
    const linkToBack = document.createElement('a');
    const descr = document.createElement('p');
    const bigBlock = document.createElement('div');

    container.classList.add('container');
    h1.classList.add('episode-title');
    linkToBack.classList.add('link');
    descr.classList.add('descr');
    bigBlock.classList.add('big-block');

    h1.textContent = data.title + '. Episode ' + data.episode_id;
    linkToBack.textContent = 'Back to episodes';
    descr.textContent = data.opening_crawl;

    linkToBack.setAttribute('onclick', 'javascript:history.back(); return false;');

    container.append(h1);
    container.append(linkToBack);
    container.append(descr);

    bigBlock.append(renderBlock('planets'));
    bigBlock.append(renderBlock('species'));
    bigBlock.append(renderBlock('starships'));

    container.append(bigBlock);
    
    return container;
}