const loader = (root): void => {
    const body = root;
    const img = document.querySelectorAll('img');
    const progress = document.createElement('progress');
    const label = document.createElement('label');
    const overlay = document.createElement('div');
    const wrap = document.createElement('div');
    const imgLength: number = img.length;
    let imgLoaded = 0;
    let progressVal = 0;

    /*
     * JS有効時に必要な要素の準備
     */
    const createElement = (): void => {
        progress.value = 0;
        progress.max = 100;
        progress.setAttribute('id', 'loading');
        progress.classList.add('progress');
        label.setAttribute('for', 'loading');
        label.classList.add('progress-label');
        label.textContent = '0%';
        overlay.classList.add('loading-overlay');
        wrap.appendChild(overlay);
        wrap.appendChild(label);
        wrap.appendChild(progress);
        wrap.classList.add('progress-wrap');
        body.style.position = 'fixed';
        body.appendChild(wrap);
    };

    /*
     * img要素の読み込み数に応じてprogressValを更新
     */
    const progressUpdate = (): void => {
        img.forEach((element): void => {
            element.addEventListener('load', () => {
                imgLoaded++;
                progressVal = Math.round((imgLoaded / imgLength) * 100);
                label.textContent = `${progressVal}%`;
                progress.value = progressVal;
            });
        });
    };

    /*
     * 読み込み完了後に画面固定解除とプログレス要素を削除
     */
    const loadedFunc = (): void => {
        window.addEventListener('load', () => {
            setTimeout(() => {
                wrap.classList.add('is-loaded');
                body.style.position = '';
            }, 500);
        });

        progress.addEventListener('transitionend', () => {
            wrap.remove();
        });
    };

    createElement();
    progressUpdate();
    loadedFunc();
};

export default function(): void {
    loader(document.body);
}
