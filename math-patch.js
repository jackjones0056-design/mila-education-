(()=>{
  const stage=document.getElementById('activityStage');
  if(!stage)return;
  const renderPositionScene=()=>{
    const prompt=document.getElementById('promptText');
    if(!prompt||prompt.textContent!=='Which position word completes the sentence?')return;
    const story=stage.querySelector('.story');
    if(!story||story.dataset.scenePatched)return;
    const m=story.textContent.match(/The star is (above|below|beside|in front of|behind) the box\./);
    if(!m)return;
    const kind=m[1];
    const pos={
      above:['95px','5px','3'],
      below:['95px','125px','3'],
      beside:['185px','72px','3'],
      'in front of':['112px','72px','4'],
      behind:['92px','72px','1']
    }[kind];
    story.dataset.scenePatched='1';
    story.innerHTML=`<div style="font-weight:900;margin-bottom:10px">Where is the star compared with the box?</div><div style="position:relative;width:260px;height:190px;margin:auto"><div style="position:absolute;left:100px;top:62px;font-size:76px;z-index:2">📦</div><div style="position:absolute;left:${pos[0]};top:${pos[1]};font-size:48px;z-index:${pos[2]}">⭐</div></div>`;
  };
  new MutationObserver(renderPositionScene).observe(stage,{childList:true,subtree:true});
  renderPositionScene();
})();