export default function Documents ({params}: {params:{slug:string[]}}){
    if(params.slug.length===2){
return <div>
    vidwing docs for feature {params.slug[0]} for the subfeature {params.slug[1]}
</div>

    




}else if(params.slug.length===1){
    return (
      <div>
        vidwing docs for feature {params.slug[0]}}
        
      </div>
    );
}else{
return <div>
    <h1>docs home page</h1>
</div>
}
}