import { Suspense } from 'react'
import { Metadata } from 'next'
import ProductCatalog from '@/components/features/ProductCatalog'
import ProductFilters from '@/components/features/ProductFilters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Grid, List } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Produtos - ShopEasy',
  description:
    'Descubra milhares de produtos com os melhores preços e qualidade. Eletrônicos, roupas, casa e jardim, e muito mais.',
  keywords: ['produtos', 'loja online', 'ecommerce', 'compras', 'brasil'],
  openGraph: {
    title: 'Produtos - ShopEasy',
    description:
      'Descubra milhares de produtos com os melhores preços e qualidade.',
    type: 'website',
  },
}

interface ProductsPageProps {
  searchParams: {
    search?: string
    category?: string
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

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const {
    search,
    category,
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
    category,
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Produtos
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Encontre os melhores produtos com qualidade garantida
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar produtos..."
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
              <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 dark:text-gray-400">
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
