import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  image: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Прорыв в квантовых вычислениях открывает новые горизонты',
    description: 'Учёные достигли нового рубежа в разработке квантовых компьютеров, способных решать задачи за секунды вместо лет.',
    category: 'Технологии',
    date: '2025-10-30',
    tags: ['наука', 'инновации', 'квантовые технологии'],
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Чемпионат мира по футболу: неожиданные результаты',
    description: 'Сборная-аутсайдер одержала сенсационную победу над фаворитом турнира со счётом 3:1.',
    category: 'Спорт',
    date: '2025-10-29',
    tags: ['футбол', 'чемпионат', 'сенсация'],
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Новая экономическая политика влияет на рынки',
    description: 'Центральный банк объявил о снижении ключевой ставки на 0.5%, что привело к росту акций.',
    category: 'Политика',
    date: '2025-10-28',
    tags: ['экономика', 'финансы', 'политика'],
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Выставка современного искусства побила рекорды посещаемости',
    description: 'Более 50 тысяч человек посетили выставку за первые три дня, что стало абсолютным рекордом.',
    category: 'Культура',
    date: '2025-10-27',
    tags: ['искусство', 'выставка', 'культура'],
    image: '/placeholder.svg'
  },
  {
    id: 5,
    title: 'ИИ-ассистенты становятся незаменимыми помощниками',
    description: 'Новое поколение искусственного интеллекта меняет подход к работе в различных индустриях.',
    category: 'Технологии',
    date: '2025-10-26',
    tags: ['ИИ', 'технологии', 'автоматизация'],
    image: '/placeholder.svg'
  },
  {
    id: 6,
    title: 'Олимпийский чемпион объявил о завершении карьеры',
    description: 'Легендарный спортсмен принял решение завершить карьеру после 15 лет побед и рекордов.',
    category: 'Спорт',
    date: '2025-10-25',
    tags: ['олимпиада', 'спорт', 'карьера'],
    image: '/placeholder.svg'
  }
];

const categories = ['Все', 'Технологии', 'Спорт', 'Политика', 'Культура'];
const dateFilters = [
  { label: 'Все время', value: 'all' },
  { label: 'Сегодня', value: 'today' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockNews.forEach(news => news.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredNews = useMemo(() => {
    return mockNews.filter(news => {
      const categoryMatch = selectedCategory === 'Все' || news.category === selectedCategory;
      
      const dateMatch = (() => {
        if (selectedDateFilter === 'all') return true;
        const newsDate = new Date(news.date);
        const today = new Date('2025-10-31');
        const diffDays = Math.floor((today.getTime() - newsDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (selectedDateFilter === 'today') return diffDays === 0;
        if (selectedDateFilter === 'week') return diffDays <= 7;
        if (selectedDateFilter === 'month') return diffDays <= 30;
        return true;
      })();

      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => news.tags.includes(tag));

      return categoryMatch && dateMatch && tagMatch;
    });
  }, [selectedCategory, selectedDateFilter, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Новостная лента</h1>
          <p className="text-gray-600 text-lg">Будьте в курсе самых важных событий</p>
        </header>

        <div className="mb-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Icon name="Filter" size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Категория:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200 hover:scale-105"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Период:</span>
            </div>
            <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon name="Tags" size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Теги:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer transition-all duration-200 hover:scale-105"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {(selectedCategory !== 'Все' || selectedDateFilter !== 'all' || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedCategory('Все');
                setSelectedDateFilter('all');
                setSelectedTags([]);
              }}
              className="flex items-center gap-2"
            >
              <Icon name="X" size={16} />
              Сбросить фильтры
            </Button>
          )}
        </div>

        <div className="mb-4 text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Найдено новостей: <span className="font-semibold text-gray-900">{filteredNews.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <Card
              key={news.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in group"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {news.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {news.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-gray-600">
                  <Icon name="Calendar" size={14} />
                  {new Date(news.date).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">{news.description}</p>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Новостей не найдено</h3>
            <p className="text-gray-600 mb-6">Попробуйте изменить параметры фильтрации</p>
            <Button
              onClick={() => {
                setSelectedCategory('Все');
                setSelectedDateFilter('all');
                setSelectedTags([]);
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
