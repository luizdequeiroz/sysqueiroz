using SysQueiroz.Core.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace SysQueiroz.Repository.Base
{
    public interface IRepository<GEntity> : IDisposable where GEntity : GenericEntity
    {
        IQueryable<TEntity> SelectAll<TEntity>() where TEntity : GenericEntity;
        IQueryable<TEntity> SelectWhere<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : GenericEntity;
        TEntity SelectByID<TEntity>(object key) where TEntity : GenericEntity;
        int Insert<TEntity>(TEntity item) where TEntity : GenericEntity;
        void Update<TEntity>(TEntity item) where TEntity : GenericEntity;
        void Delete<TEntity>(TEntity item) where TEntity : GenericEntity;
        void Commit();
    }
}