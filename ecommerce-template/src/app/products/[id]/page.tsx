import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  Check,
  Minus,
  Plus,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ProductImageGallery from '@/components/features/ProductImageGallery'
import ProductReviews from '@/components/features/ProductReviews'
import RelatedProducts from '@/components/features/RelatedProducts'
import AddToCartButton from '@/components/features/AddToCartButton'
import { Header, Footer } from '@/components/layout'

interface ProductPageProps {
  params: {
    id: string
  }
}

// This would normally fetch from your API/database
async function getProduct(id: string) {
  // Mock product data for demonstration
  return {
    id,
    title: 'iPhone 15 Pro Max 256GB',
    description:
      'O iPhone 15 Pro Max redefine o que é possível em um smartphone. Com o poderoso chip A17 Pro, sistema de câmeras Pro avançado e design em titânio, oferece desempenho excepcional para profissionais e entusiastas.',
    category_id: 'eletronicos',
    category: { name: 'Eletrônicos', slug: 'eletronicos' },
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
    ],
    price: 10999.99,
    compare_at_price: 12999.99,
    sku: 'IPHONE15PM256',
    stock_quantity: 25,
    track_inventory: true,
    allow_backorder: false,
    weight: 221,
    dimensions: {
      length: 159.9,
      width: 76.7,
      height: 8.25,
    },
    requires_shipping: true,
    is_digital: false,
    status: 'active' as const,
    available: true,
    store_id: 'store-1',
    store: {
      name: 'TechStore Brasil',
      slug: 'techstore-brasil',
      logo: '/api/placeholder/100/100',
    },
    specifications: {
      Tela: '6.7" Super Retina XDR OLED',
      Processador: 'A17 Pro',
      Armazenamento: '256GB',
      Câmera: '48MP + 12MP + 12MP',
      Bateria: 'Até 29h de reprodução de vídeo',
      Resistência: 'IP68',
      Conectividade: '5G, Wi-Fi 6E, Bluetooth 5.3',
      Sistema: 'iOS 17',
    },
    seo_title: 'iPhone 15 Pro Max 256GB - Compre na ShopEasy',
    seo_description:
      'iPhone 15 Pro Max 256GB com melhor preço e frete grátis. Garantia Apple, entrega rápida.',
    rating: 4.8,
    review_count: 247,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)

  if (!product) {
    return {
      title: 'Produto não encontrado - ShopEasy',
    }
  }

  return {
    title: product.seo_title || `${product.title} - ShopEasy`,
    description: product.seo_description || product.description,
    keywords: [
      product.title,
      product.category.name,
      'comprar',
      'preço',
      'brasil',
    ],
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images,
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)

  if (!product) {
    notFound()
  }

  const isOnSale =
    product.compare_at_price && product.compare_at_price > product.price
  const discountPercent = isOnSale
    ? Math.round(
        ((product.compare_at_price! - product.price) /
          product.compare_at_price!) *
          100
      )
    : 0

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex text-sm text-gray-600 dark:text-gray-300">
              <Link
                href="/"
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                Início
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/products"
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                Produtos
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                {product.category.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-gray-100 truncate">
                {product.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery
                images={product.images}
                title={product.title}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Store Info */}
              <div className="flex items-center space-x-3">
                <Image
                  src={product.store.logo}
                  alt={product.store.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <Link
                  href={`/stores/${product.store.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {product.store.name}
                </Link>
              </div>

              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {product.title}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      {product.rating} ({product.review_count} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Favoritar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {isOnSale && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        R${' '}
                        {product.compare_at_price!.toFixed(2).replace('.', ',')}
                      </span>
                      <Badge variant="destructive">
                        {discountPercent}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    ou 10x de R${' '}
                    {(product.price / 10).toFixed(2).replace('.', ',')} sem
                    juros
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {product.stock_quantity > 0 ? (
                  <>
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Em estoque ({product.stock_quantity} disponíveis)
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">
                    Fora de estoque
                  </span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantidade:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      defaultValue="1"
                      className="w-16 text-center border-none focus:ring-0 h-10"
                      min="1"
                      max={product.stock_quantity}
                    />
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <AddToCartButton
                    product={product}
                    className="w-full h-12"
                    disabled={product.stock_quantity === 0}
                  />

                  <Button variant="outline" className="w-full h-12">
                    Comprar Agora
                  </Button>
                </div>
              </div>

              {/* Shipping and Guarantees */}
              <Card className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Frete Grátis</div>
                    <div className="text-sm text-gray-600">
                      Para compras acima de R$ 199
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Garantia do Vendedor</div>
                    <div className="text-sm text-gray-600">
                      12 meses de garantia
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Devolução Grátis</div>
                    <div className="text-sm text-gray-600">
                      30 dias para trocar ou devolver
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Descrição
                </button>
                <button className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Especificações
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Avaliações ({product.review_count})
                </button>
              </nav>
            </div>

            <div className="py-8">
              {/* Specifications Tab Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-gray-100"
                  >
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <ProductReviews productId={product.id} />

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Produtos Relacionados
            </h2>
            <RelatedProducts
              productId={product.id}
              categoryId={product.category_id}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
