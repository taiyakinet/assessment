'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
 * 指定したHTML要素の子要素をすべて削除する
 * @param {HTMLElemnt}elementHTML要素
 */
function removeAllChildren(element){
while (element.firstChild){
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = ()=>{
    const userName = userNameInput.value;
   if (userName.length === 0) { // 名前が空の時は処理を終了する
     return;
    };
    //診断結果表示エリアの作成
　 removeAllChildren(resultDivided);
   removeAllChildren(tweetDivided);

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたへのおススメダム')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたへのおススメダム診断';
    tweetDivided.appendChild(anchor);
    
    twttr.widgets.load();
};
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };
const answers = [
    '志の高い{userName}へのおススメダムは高瀬ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=1027',
    'その汚れない真っ白な心の持ち主の{userName}へのおススメダムは南相木ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=3280',
    '優しくて心が広い{userName}へのおススメダムは徳山ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=1130',
    '数々の苦難も乗り越えられる{userName}へのおススメダムは黒部ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=0848',
    '楽しいことが大好きで、いつも周りを盛り上げている{userName}へのおススメダムは宮ケ瀬ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=0703',
    '自身のアップデートも怠らず、アウトプットにも積極的な{userName}へのおススメダムは丸山ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=1136 https://taiyakinet.github.io/assessment/assessment.html',
    '見た目の割にフットワークの軽い{userName}へのおススメダムは畑薙第一ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=1168',
    '独創的でユニークな存在の{userName}へのおススメダムは 豊稔池ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=3048',
    '人気者で交友関係が広い{userName}へのおススメダムは雨竜第一ダムです。http://damnet.or.jp/cgi-bin/binranA/All.cgi?db4=0040'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}usernameユーザーの名前
 * @returns{string}診断結果
 */
function assessment(userName){
    //全文字足し合わせる
    let sumofCharCode = 0;
    for (let i=0; i < userName.length; i++){
        sumofCharCode =sumofCharCode + userName.charCodeAt(i);     
    }
    const index = sumofCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);

    return result;
    console.assert(
        assessment(userName) === assessment(userName),
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
      );
}
　
