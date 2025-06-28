'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ProductFilters as ProductFiltersType } from '@/types'
import { X, Filter } from 'lucide-react'

interface ProductFiltersProps {
  filters: ProductFiltersType
}

// Mock categories - replace with actual API data
const categories = [
  { id: 'eletronicos', name: 'Eletrônicos', count: 245 },
  { id: 'roupas-acessorios', name: 'Roupas e Acessórios', count: 189 },
  { id: 'casa-jardim', name: 'Casa e Jardim', count: 156 },
  { id: 'esportes-lazer', name: 'Esportes e Lazer', count: 132 },
  { id: 'livros-midia', name: 'Livros e Mídia', count: 98 },
  { id: 'beleza-saude', name: 'Beleza e Saúde', count: 87 },
  { id: 'automotivo', name: 'Automotivo', count: 76 },
  { id: 'games', name: 'Games', count: 65 },
]

export default function ProductFilters({ filters }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([
    filters.min_price || 0,
    filters.max_price || 50000,
  ])

  const [isCollapsed, setIsCollapsed] = useState(false)

  const updateFilter = (
    key: string,
    value: string | number | boolean | null
  ) => {
    const params = new URLSearchParams(searchParams)

    if (value === null || value === '' || value === false) {
      params.delete(key)
    } else {
      params.set(key, String(value))
    }

    // Reset to first page when filters change
    params.delete('page')

    router.push(`/products?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push('/products')
  }

  const activeFiltersCount = Object.values(filters).filter(
    value =>
      value !== undefined && value !== null && value !== false && value !== ''
  ).length

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>

        <div className="flex space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Limpar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? 'Mostrar' : 'Ocultar'}
          </Button>
        </div>
      </div>

      <div className={`space-y-6 ${isCollapsed ? 'hidden lg:block' : ''}`}>
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <Card className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Filtros Ativos
            </h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Categoria:{' '}
                  {categories.find(c => c.id === filters.category)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => updateFilter('category', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.min_price && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Min: R$ {filters.min_price}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => updateFilter('min_price', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.max_price && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Max: R$ {filters.max_price}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => updateFilter('max_price', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.in_stock && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Em estoque
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => updateFilter('in_stock', false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.on_sale && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Em promoção
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => updateFilter('on_sale', false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </Card>
        )}

        {/* Categories */}
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Categorias</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() =>
                  updateFilter(
                    'category',
                    filters.category === category.id ? null : category.id
                  )
                }
                className={`w-full text-left flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                  filters.category === category.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-gray-500">({category.count})</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Price Range */}
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Faixa de Preço
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.min_price || ''}
                onChange={e =>
                  updateFilter(
                    'min_price',
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-20 text-sm"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.max_price || ''}
                onChange={e =>
                  updateFilter(
                    'max_price',
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-20 text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>R$ 0</span>
                <span>R$ 50.000</span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateFilter(
                      'min_price',
                      priceRange[0] > 0 ? priceRange[0] : null
                    )
                    updateFilter(
                      'max_price',
                      priceRange[1] < 50000 ? priceRange[1] : null
                    )
                  }}
                >
                  Aplicar Faixa
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Filters */}
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Disponibilidade
          </h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.in_stock || false}
                onChange={e => updateFilter('in_stock', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Apenas em estoque</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.on_sale || false}
                onChange={e => updateFilter('on_sale', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Em promoção</span>
            </label>
          </div>
        </Card>
      </div>
    </div>
  )
}
