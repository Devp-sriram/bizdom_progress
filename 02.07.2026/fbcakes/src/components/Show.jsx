import './Show.css'

function Show() {
    const images = [
        {
            id:1,
            url:'https://bizdomfs.blob.core.windows.net/post-image/7f4e05c1-7310-4f1b-9e7f-ab72ec40f2e8.png'
        },
        {
            id:2,
            url:'https://bizdomfs.blob.core.windows.net/post-image/e4a471f2-08de-40f0-9fbf-5e7243f3d126.png'
        },
    ]

    return (
    <div className='showContainer d-flex justify-content-center gap-4 my-5 py-2'>
      {images.map(img=>{
        return <div key={img.id} className='show'>
            <img src={img.url}/>
        </div>
      })}
    </div>
  )
}

export default Show
