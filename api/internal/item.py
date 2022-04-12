from dataclasses import dataclass

@dataclass
class Item:
    """An item that gets returned from the store search"""
    id: int
    name: str
    price: float
    description: str
    image_url: str
    
    def __str__(self):
        return f"Item: {self.name} - {self.price}"
    
    


