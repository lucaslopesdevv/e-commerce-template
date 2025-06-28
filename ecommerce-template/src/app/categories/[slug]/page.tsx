import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCatalog from '@/components/features/ProductCatalog'
import ProductFilters from '@/components/features/ProductFilters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Grid, List } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    search?: string
    store?: string
    min_price?: string
    max_price?: string
    in_stock?: string
    on_sale?: string
    sort_by?: string
    page?: string
    view?: 'grid' | 'list'
  }
}

// Mock category data - replace with actual API call
async function getCategory(slug: string) {
  const categories = {
    eletronicos: {
      id: 'eletronicos',
      name: 'Eletrônicos',
      slug: 'eletronicos',
      description:
        'Smartphones, notebooks, tablets, fones de ouvido e todos os gadgets tecnológicos que você precisa.',
      image: '/api/placeholder/1200/300',
      productCount: 245,
    },
    'roupas-acessorios': {
      id: 'roupas-acessorios',
      name: 'Roupas e Acessórios',
      slug: 'roupas-acessorios',
      description:
        'Moda masculina, feminina e infantil. Roupas, calçados, bolsas e acessórios para todos os estilos.',
      image: '/api/placeholder/1200/300',
      productCount: 189,
    },
    'casa-jardim': {
      id: 'casa-jardim',
      name: 'Casa e Jardim',
      slug: 'casa-jardim',
      description:
        'Móveis, decoração, eletrodomésticos, ferramentas e tudo para deixar sua casa mais bonita e funcional.',
      image: '/api/placeholder/1200/300',
      productCount: 156,
    },
  }

  return categories[slug as keyof typeof categories] || null
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await getCategory(params.slug)

  if (!category) {
    return {
      title: 'Categoria não encontrada - ShopEasy',
    }
  }

  return {
    title: `${category.name} - ShopEasy`,
    description: category.description,
    keywords: [category.name, 'produtos', 'comprar', 'online', 'brasil'],
    openGraph: {
      title: `${category.name} - ShopEasy`,
      description: category.description,
      images: [category.image],
      type: 'website',
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const {
    search,
    store,
    min_price,
    max_price,
    in_stock,
    on_sale,
    sort_by = 'newest',
    page = '1',
    view = 'grid',
  } = searchParams

  const filters = {
    search,
    category: category.id,
    store,
    min_price: min_price ? parseFloat(min_price) : undefined,
    max_price: max_price ? parseFloat(max_price) : undefined,
    in_stock: in_stock === 'true',
    on_sale: on_sale === 'true',
    sort_by: sort_by as any,
  }

  const currentPage = parseInt(page, 10)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Início
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-gray-900">
                Produtos
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                {category.description}
              </p>
              <div className="text-sm text-gray-500">
                {category.productCount} produtos disponíveis
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder={`Buscar em ${category.name}...`}
                    defaultValue={search}
                    className="pl-10 h-12"
                  />
                </div>
                <Button variant="outline" size="lg" className="h-12">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-8">
                <Suspense
                  fallback={
                    <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
                  }
                >
                  <ProductFilters filters={filters} />
                </Suspense>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">
                  Exibindo produtos {(currentPage - 1) * 20 + 1}-
                  {currentPage * 20}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Options */}
                  <select
                    defaultValue={sort_by}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Mais Recentes</option>
                    <option value="price_asc">Menor Preço</option>
                    <option value="price_desc">Maior Preço</option>
                    <option value="name_asc">Nome A-Z</option>
                    <option value="name_desc">Nome Z-A</option>
                    <option value="best_selling">Mais Vendidos</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-md">
                    <Button
                      variant={view === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={view === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Grid/List */}
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse bg-gray-200 h-80 rounded-lg"
                      />
                    ))}
                  </div>
                }
              >
                <ProductCatalog
                  filters={filters}
                  page={currentPage}
                  view={view}
                />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
