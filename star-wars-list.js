export function render(data) {
    console.log(data)
    const container = document.createElement('div');
    container.classList.add('container');

    for (let i = 0; i < data.count; i++) {
        const elementLink = document.createElement('a');
        elementLink.textContent = (i + 1) + ' ' + data.results[i].title;
        elementLink.href = `?chapter=${i + 1}`;
        elementLink.classList.add('link');
        container.append(elementLink);
    }

    return container;
}