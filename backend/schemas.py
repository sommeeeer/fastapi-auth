from pydantic import BaseModel, EmailStr, Field


class PostBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    content: str | None = Field(None, min_length=3, max_length=500)


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)


class UserCreate(UserBase):
    email: str = Field(EmailStr, min_length=5, max_length=50)
    password: str = Field(..., min_length=6, max_length=25)


class User(UserBase):
    id: int
    posts: list[Post] = []

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
