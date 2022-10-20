config({
    class1:{
        red: ["text-danger"]
    },
    class2:{
        red: {
            color: "red"
        }
    },
    define: [
        "text-div-.red",
        "container-div"
    ],
    arrange: [
        "container = text"
    ]
});

pick("text").text("hello world")

root({
    child: pick("text")
})