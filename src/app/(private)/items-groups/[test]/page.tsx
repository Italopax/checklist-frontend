export default async function ItemsGroupDetails ({ params }: { params: Promise<{ test: string }> }) {
    const { test } = await params;
    console.log(test)

    return (
        <div>Detalhes de um grupo de itens. Slug: {test}</div>
    );
}