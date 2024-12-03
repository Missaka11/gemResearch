class GemShapes:
    # Dictionary containing gem shapes and their descriptions
    GEMS = {
        'heart': {
            'name': 'heart',
        },
        'marquise': {
            'name': 'marquise',
        },
        'oval': {
            'name': 'oval',
        },
        'pear': {
            'name': 'pear',
        },
        'round': {
            'name': 'round',
        },
        'square': {
            'name': 'square',
        },
        'triangle': {
            'name': 'triangle',
        }
    }

    @classmethod
    def get_all_shapes(cls):
        """Returns a list of all gem shapes"""
        return list(cls.GEMS.keys())

    @classmethod
    def get_gem_info(cls, gem_name):
        """Returns detailed information about a specific gem"""
        return cls.GEMS.get(gem_name.lower())

    @classmethod
    def get_gem_names(cls):
        """Returns a list of formatted gem shapes"""
        return [info['name'] for info in cls.GEMS.values()]

    @classmethod
    def is_valid_category(cls, category):
        """Checks if a shape is valid"""
        return category.lower() in cls.GEMS

    @classmethod
    def get_category_count(cls):
        """Returns the total number of gem shapes"""
        return len(cls.GEMS)