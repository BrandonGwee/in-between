const renderStart = () => {
    const heading = "<h1 class=\"center\">In Between</h1>";
    const subtitle = "<h3 class=\"center\">Card Game Simulator</h3>"
    const startButton = "<button type=\"button\" id=\"startButton\" onclick=\"startGame()\">Start Game</button>";

    return heading + "<br/>" + subtitle + "<br/>" + startButton;
}

export default renderStart();