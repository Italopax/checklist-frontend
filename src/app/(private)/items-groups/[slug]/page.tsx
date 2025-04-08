export default async function ItemsGroupDetails ({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log(slug)

    return (
        <div>Detalhes de um grupo de itens. Slug: {slug}</div>
    );
}