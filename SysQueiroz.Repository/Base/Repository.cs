using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace SysQueiroz.Repository.Base
{
    public class Repository<GEntity> : IRepository<GEntity> where GEntity : GenericEntity
    {
        private SysQueirozContext _context;

        public Repository(SysQueirozContext context)
        {
            _context = context;
        }

        public TEntity SelectByID<TEntity>(object key) where TEntity : GenericEntity
        {
            return _context.Set<TEntity>().Find(key);
        }

        public IQueryable<TEntity> SelectAll<TEntity>() where TEntity : GenericEntity
        {
            return _context.Set<TEntity>();
        }

        public IQueryable<TEntity> SelectWhere<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : GenericEntity
        {
            return _context.Set<TEntity>().Where(predicate);
        }

        public int Insert<TEntity>(TEntity item) where TEntity : GenericEntity
        {
            _context.Set<TEntity>().Add(item);
            Commit();
            return item.Id;
        }

        public void Delete<TEntity>(TEntity item) where TEntity : GenericEntity
        {
            _context.Set<TEntity>().Remove(item);
            Commit();
        }

        public void Update<TEntity>(TEntity item) where TEntity : GenericEntity
        {
            _context.Entry(item).State = EntityState.Modified;
            Commit();
        }

        public void Commit()
        {
            int ret = 0;
            bool saveFailed;
            do
            {
                saveFailed = false;

                try
                {
                    ret = _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException exception)
                {
                    saveFailed = true;

                    var entry = exception.Entries.Single();
                    entry.OriginalValues.SetValues(entry.GetDatabaseValues());
                }
                catch (DbUpdateException exception)
                {
                    saveFailed = true;
                    throw exception;
                }
            }
            while (saveFailed);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}