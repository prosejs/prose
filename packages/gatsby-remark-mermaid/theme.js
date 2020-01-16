// TODO: mermaid theme support, other diagrams
const theme = () => {
  return {
    '.label': {
      // fontFamily: 'trebuchet ms', verdana, arial;
      // fontFamily: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: 12,
      color: '#333',
    },
    '.label text': {
      fill: '#333',
    },
    '.node rect, .node circle, .node ellipse, .node polygon, .node path': {
      fill: '#ECECFF',
      stroke: '#9370DB',
      strokeWidth: '1px',
    },
    '.node .label': {
      textAlign: 'center',
    },
    '.node.clickable': {
      cursor: 'pointer',
    },
    '.arrowheadPath': {
      fill: '#333333',
    },
    '.edgePath .path': {
      stroke: '#333333',
      strokeWidth: '1.5px',
    },
    '.edgeLabel': {
      fontSize: 12,
      backgroundColor: '#e8e8e8',
      textAlign: 'center',
    },
    '.cluster rect': {
      fill: '#ffffde',
      stroke: '#aaaa33',
      strokeWidth: '1px',
    },
    '.cluster text': {
      fill: '#333',
    },
    'div.mermaidTooltip': {
      position: 'absolute',
      textAlign: 'center',
      maxWidth: '200px',
      padding: '2px',
      // fontFamily: 'trebuchet ms', verdana, arial;
      // fontFamily: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: 12,
      background: '#ffffde',
      border: '1px solid #aaaa33',
      borderRadius: '2px',
      pointerEvents: 'none',
      zIndex: 100,
    },
    '.actor': {
      stroke: '#CCCCFF',
      fill: '#ECECFF',
      fontFamily: 'body',
      fontSize: 12,
    },
    'text.actor': {
      fill: 'black',
      stroke: 'none',
    },
    '.actor-line': {
      stroke: 'grey',
    },
    '.messageLine0': {
      strokeWidth: 1.5,
      strokeDasharray: '2 2',
      stroke: '#333',
    },
    '.messageLine1': {
      strokeWidth: 1.5,
      strokeDasharray: '2 2',
      stroke: '#333',
    },
    '#arrowhead': {
      fill: '#333',
    },
    '.sequenceNumber': {
      fill: 'white',
    },
    '#sequencenumber': {
      fill: '#333',
    },
    '#crosshead path': {
      fill: '#333 !important',
      stroke: '#333 !important',
    },
    '.messageText': {
      fill: '#333',
      stroke: 'none',
      fontFamily: 'body',
      fontSize: 12,
    },
    '.labelBox': {
      stroke: '#CCCCFF',
      fill: '#ECECFF',
    },
    '.labelText': {
      fill: 'black',
      stroke: 'none',
    },
    '.loopText': {
      fill: 'black',
      stroke: 'none',
    },
    '.loopLine': {
      strokeWidth: 2,
      strokeDasharray: '2 2',
      stroke: '#CCCCFF',
    },
    '.note': {
      stroke: '#aaaa33',
      fill: '#fff5ad',
    },
    '.noteText': {
      fill: 'black',
      stroke: 'none',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: 14,
    },
    '.activation0': {
      fill: '#f4f4f4',
      stroke: '#666',
    },
    '.activation1': {
      fill: '#f4f4f4',
      stroke: '#666',
    },
    '.activation2': {
      fill: '#f4f4f4',
      stroke: '#666',
    },
    '.mermaid-main-font': {
      // font-family: "trebuchet ms", verdana, arial;
      // font-family: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
    },
    '.section': {
      stroke: 'none',
      opacity: 0.2,
    },
    '.section0': {
      fill: 'rgba(102, 102, 255, 0.49)',
    },
    '.section2': {
      fill: '#fff400',
    },
    '.section1, .section3': {
      fill: 'white',
      opacity: 0.2,
    },
    '.sectionTitle0': {
      fill: '#333',
    },
    '.sectionTitle1': {
      fill: '#333',
    },
    '.sectionTitle2': {
      fill: '#333',
    },
    '.sectionTitle3': {
      fill: '#333',
    },
    '.sectionTitle': {
      textAnchor: 'start',
      fontSize: 12,
      // textHeight: '14px',
      // fontFamily: 'trebuchet ms', verdana, arial;
      // fontFamily: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
    },
    '.grid .tick': {
      stroke: 'lightgrey',
      opacity: 0.8,
      shapeRendering: 'crispEdges',
    },
    '.grid .tick text': {
      //   font-family: 'trebuchet ms', verdana, arial;
      //   font-family: var(--mermaid-font-family); }
      fontFamily: 'body',
      fontWeight: 'body',
    },
    '.grid path': {
      strokeWidth: 0,
    },
    '.today': {
      fill: 'none',
      stroke: 'red',
      strokeWidth: '2px',
    },
    '.task': {
      strokeWidth: 2,
    },
    '.taskText': {
      textAnchor: 'middle',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
    },
    '.taskText:not([font-size])': {
      fontSize: 12,
    },
    '.taskTextOutsideRight': {
      fill: 'black',
      textAnchor: 'start',
      fontSize: 12,
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
    },
    '.taskTextOutsideLeft': {
      fill: 'black',
      textAnchor: 'end',
      fontSize: 12,
    },
    '.task.clickable': {
      cursor: 'pointer',
    },
    '.taskText.clickable': {
      cursor: 'pointer',
      fill: '#003163 !important',
      fontWeight: 'heading',
    },
    '.taskTextOutsideLeft.clickable': {
      cursor: 'pointer',
      fill: '#003163 !important',
      fontWeight: 'heading',
    },
    '.taskTextOutsideRight.clickable': {
      cursor: 'pointer',
      fill: '#003163 !important',
      fontWeight: 'heading',
    },
    '.taskText0, .taskText1, .taskText2, .taskText3': {
      fill: 'white',
    },
    '.task0, .task1, .task2, .task3': {
      fill: '#8a90dd',
      stroke: '#534fbc',
    },
    '.taskTextOutside0, .taskTextOutside2': {
      fill: 'black',
    },
    '.taskTextOutside1, .taskTextOutside3': {
      fill: 'black',
    },
    '.active0, .active1, .active2, .active3': {
      fill: '#bfc7ff',
      stroke: '#534fbc',
    },
    '.activeText0, .activeText1, .activeText2, .activeText3': {
      fill: 'black !important',
    },
    '.done0, .done1, .done2, .done3': {
      stroke: 'grey',
      fill: 'lightgrey',
      strokeWidth: 2,
    },
    '.doneText0, .doneText1, .doneText2, .doneText3': {
      fill: 'black !important',
    },
    '.crit0, .crit1, .crit2, .crit3': {
      stroke: '#ff8888',
      fill: 'red',
      strokeWidth: 2,
    },
    '.activeCrit0, .activeCrit1, .activeCrit2, .activeCrit3': {
      stroke: '#ff8888',
      fill: '#bfc7ff',
      strokeWidth: 2,
    },
    '.doneCrit0, .doneCrit1, .doneCrit2, .doneCrit3': {
      stroke: '#ff8888',
      fill: 'lightgrey',
      strokeWidth: 2,
      cursor: 'pointer',
      shapeRendering: 'crispEdges',
    },
    '.milestone': {
      transform: 'rotate(45deg) scale(0.8, 0.8)',
    },
    '.milestoneText': {
      fontStyle: 'italic',
    },
    '.doneCritText0, .doneCritText1, .doneCritText2, .doneCritText3': {
      fill: 'black !important',
    },
    '.activeCritText0, .activeCritText1, .activeCritText2, .activeCritText3': {
      fill: 'black !important',
    },
    '.titleText': {
      textAnchor: 'middle',
      fontSize: 16,
      fill: 'black',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family); }
      fontFamily: 'body',
      fontWeight: 'body',
    },
    'g.classGroup text': {
      fill: '#9370DB',
      stroke: 'none',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family);
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: 12,
    },
    'g.classGroup text .title': {
      fontWeight: 'display',
    },
    'g.clickable': {
      cursor: 'pointer',
    },
    'g.classGroup rect': {
      fill: '#ECECFF',
      stroke: '#9370DB',
    },
    'g.classGroup line': {
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '.classLabel .box': {
      stroke: 'none',
      strokeWidth: 0,
      fill: '#ECECFF',
      opacity: 0.5,
    },
    '.classLabel .label': {
      fill: '#9370DB',
      fontSize: 12,
    },
    '.relation': {
      stroke: '#9370DB',
      strokeWidth: 1,
      fill: 'none',
    },
    '.dashedLine': {
      strokeDasharray: 3,
    },
    '#compositionStart': {
      fill: '#9370DB',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#compositionEnd': {
      fill: '#9370DB',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#aggregationStart': {
      fill: '#ECECFF',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#aggregationEnd': {
      fill: '#ECECFF',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#dependencyStart': {
      fill: '#9370DB',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#dependencyEnd': {
      fill: '#9370DB',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#extensionStart': {
      fill: '#9370DB',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '#extensionEnd': {
      fill: '#9370DB',
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '.commit-id, .commit-msg, .branch-label': {
      fill: 'lightgrey',
      color: 'lightgrey',
      fontFamily: 'body',
      fontWeight: 'body',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family); }
    },
    '.pieTitleText': {
      textAnchor: 'middle',
      fontSize: 24,
      fill: 'black',
      fontFamily: 'body',
      fontWeight: 'body',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family); }
    },
    '.slice': {
      fontFamily: 'body',
      fontWeight: 'body',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family); }
    },
    'g.stateGroup text': {
      fill: '#9370DB',
      stroke: 'none',
      fontSize: 12,
      fontFamily: 'body',
      fontWeight: 'body',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family); }
    },
    'g.stateGroup .state-title': {
      fontWeight: 'display',
      fill: 'black',
    },
    'g.stateGroup rect': {
      fill: '#ECECFF',
      stroke: '#9370DB',
    },
    'g.stateGroup line': {
      stroke: '#9370DB',
      strokeWidth: 1,
    },
    '.transition': {
      stroke: '#9370DB',
      strokeWidth: 1,
      fill: 'none',
    },
    '.stateGroup .composit': {
      fill: 'white',
      borderBottom: '1px',
    },
    '.stateGroup .alt-composit': {
      fill: '#e0e0e0',
      borderBottom: '1px',
    },
    '.state-note': {
      stroke: '#aaaa33',
      fill: '#fff5ad',
    },
    '.state-note text': {
      fill: 'black',
      stroke: 'none',
      fontSize: 12,
    },
    '.stateLabel .box': {
      stroke: 'none',
      strokeWidth: 0,
      fill: '#ECECFF',
      opacity: 0.5,
    },
    '.stateLabel text': {
      fill: 'black',
      fontSize: 12,
      // fontWeight: 'bold',
      fontFamily: 'body',
      fontWeight: 'heading',
      // font-family: 'trebuchet ms', verdana, arial;
      // font-family: var(--mermaid-font-family); }
    },
  }
}

module.exports = theme
