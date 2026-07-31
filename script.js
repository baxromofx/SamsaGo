*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:#fff8f0;
}

header{
    background:#d84315;
    color:#fff;
    padding:15px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:sticky;
    top:0;
}

header h1{
    font-size:28px;
}

#language,#cartBtn{
    padding:10px;
    border:none;
    border-radius:10px;
}

.products{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:20px;
    padding:20px;
}

.card{
    background:#fff;
    border-radius:15px;
    overflow:hidden;
    box-shadow:0 4px 15px rgba(0,0,0,.15);
    transition:.3s;
}

.card:hover{
    transform:translateY(-5px);
}

.card img{
    width:100%;
    height:200px;
    object-fit:cover;
}

.card h2{
    padding:10px;
}

.card p{
    padding:0 10px 10px;
    color:#d84315;
    font-size:20px;
    font-weight:bold;
}

.card button{
    width:90%;
    margin:10px;
    padding:12px;
    background:#ff6f00;
    color:white;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-size:16px;
}

.card button:hover{
    background:#e65100;
}

footer{
    text-align:center;
    padding:20px;
    background:#d84315;
    color:white;
}
